require('dotenv').config()
const Calculation = require('../model/calculation.model')
const Product = require('../model/product.model')
const s3Service = require('./amazonS3.service')
const cron = require('node-cron')
const constants = require('../utils/constants')

cron.schedule("* * * * *", () => {
    this.processAllFiles()
}, {})

exports.calculateCostsByYear = async (kwhYear) => {
    return await Product.find()
        .then(products => {
            let consumption = {
                kwhYear: kwhYear,
                products: []
            }
            products.forEach(p => {
                let product = {
                    name: p.tariffName,
                    totalYear: calculateTotal(p, kwhYear)
                }
                consumption.products.push(product)
            })
            consumption.products = consumption.products.sort((a, b) => (a.totalYear.totalCosts > b.totalYear.totalCosts) ? 1 :
                ((b.totalYear.totalCosts > a.totalYear.totalCosts) ? -1 : 0));
            return consumption;
        })
}

const calculateTotal = (product, kwhYear) => {
    if (product.rule === 'basic' || product.rule !== 'packaged')
        return getCostsBasicOrDefault(product, kwhYear);
    return getCostsPackaged(kwhYear, product);
}

function getCostsBasicOrDefault(product, kwhYear) {
    let baseCostsYear = product.baseCostMonth * 12;
    let kwhCostsYear = product.costKwh * kwhYear;
    return {
        baseCostsYear: baseCostsYear,
        kwhCostsYear: kwhCostsYear,
        totalCosts: baseCostsYear + kwhCostsYear
    }
}

function getCostsPackaged(kwhYear, product) {
    let baseCostsYear = constants.lessThan4000KwhYear;
    let kwhCostsYear = constants.lessThan4000KwhYear;
    let total = 800;

    if (kwhYear > 4000) {
        let exceeded = kwhYear - 4000;
        baseCostsYear = product.baseCostMonth;
        kwhCostsYear = product.costKwh * exceeded;
        total = total + kwhCostsYear;
    }

    return {
        baseCostsYear: baseCostsYear,
        kwhCostsYear: kwhCostsYear,
        totalCosts: total
    }
}

exports.listAllCalculation = async () => {
    return Calculation.find();
}


exports.processAllFiles = async () => {
    return await s3Service.listAllToProcess()
        .then(fileNames => {
            fileNames.forEach(fileName => {
                s3Service.downloadFileToProcess(fileName)
                    .then(fileData => {
                        fileData.Body.toString().split('\n')
                            .forEach(l => {
                                let line = JSON.parse(l)
                                this.calculateCostsByYear(line['kwhYear'])
                                    .then(cost => {
                                        let calculation = new Calculation({
                                            dateProcessed: new Date().toISOString(),
                                            installNumber: line['installNumber'],
                                            person: {
                                                firstName: line['firstName'],
                                                lastName: line['lastName']
                                            },
                                            totalCosts: cost
                                        })
                                        calculation.save()
                                        s3Service.deleteFileById(fileName)
                                            .then(value => value)
                                            .catch(reason => {
                                                throw reason
                                            })
                                    })
                            })
                    })
            })
        }).catch(reason => {
            throw reason
        })
}