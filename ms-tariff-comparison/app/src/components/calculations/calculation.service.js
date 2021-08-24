require("dotenv").config();
const Calculation = require("./calculation.model");
const Product = require('../products/product.model')
const InternalServerError = require("../../error/models/internalServerError");
const BadRequestError = require("../../error/models/badRequestError");
const NotFoundError = require("../../error/models/notFoundError");

exports.deleteCalculations = async (ids) => {
    if (!ids.length) {
        throw new BadRequestError("Empty id list to delete!");
    }

    return await Calculation.deleteMany({_id: ids})
        .then((value) => {
            if (value.deletedCount === 0) {
                throw new NotFoundError("No id found to delete!");
            }
            return value;
        }).catch((reason) => {
            throw reason;
        });
};

exports.calculateCostsByYear = async (kwhYear) => {
    if (!kwhYear) throw new BadRequestError("KwYear is required!");
    return await Product.find()
        .then((products) => {
            const consumption = {
                kwhYear: kwhYear,
                products: [],
            };
            products.forEach((p) => {
                const product = {
                    name: p.tariffName,
                    description: p.description,
                    charger: p.month ? "Month" : "Annual",
                    totalYear: calculateTotal(p, kwhYear),
                };
                consumption.products.push(product);
            });
            consumption.products = consumption.products
                .sort((a, b) => (a.totalYear.totalCosts > b.totalYear.totalCosts) ?
                    1 :
                    ((b.totalYear.totalCosts > a.totalYear.totalCosts) ? -1 : 0));
            return consumption;
        }).catch((reason) => {
            throw reason;
        });
};

exports.listAllCalculation = async () => {
    return Calculation.find()
        .then((value) => value)
        .catch((reason) => {
            throw new InternalServerError(reason.message);
        });
};


const calculateTotal = (product, kwhYear) => {
    let baseCostsYear = 0;
    let kwhCostYear = 0;
    const totalYear = {};

    if (product.month) {
        baseCostsYear = product.values.baseCost * 12;
        kwhCostYear = product.values.kwhCost * kwhYear;
        totalYear.baseCostsYear = baseCostsYear;
        totalYear.kwhCostsYear = kwhCostYear;
        totalYear.totalCosts = baseCostsYear + kwhCostYear;
    } else {
        if (kwhYear > product.values.maxConsumption) {
            const exceeded = kwhYear - product.values.maxConsumption;
            baseCostsYear = product.values.baseCost;
            kwhCostYear = product.values.kwhCost * exceeded;
            totalYear.baseCostsYear = baseCostsYear;
            totalYear.kwhCostsYear = kwhCostYear;
            totalYear.totalCosts = baseCostsYear + kwhCostYear;
        } else {
            const baseTotalMsg =
                `Using less then:${product.values.maxConsumption} KWH/Year. Charge annual tariff: ${product.values.baseCost}`;
            totalYear.baseCostsYear = baseTotalMsg;
            totalYear.kwhCostsYear = baseTotalMsg;
            totalYear.totalCosts = product.values.baseCost;
        }
    }

    return totalYear;
};