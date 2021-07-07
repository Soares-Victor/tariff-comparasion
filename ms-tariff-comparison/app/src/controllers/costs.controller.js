const service = require('../services/costs.service')
const s3Service = require('../services/amazonS3.service')

exports.calculateCostsByYear = async (req, res) => {
    return await service.calculateCostsByYear(req.body.kwhYear)
        .then(value => res.send(value))
        .catch(reason => res.status(500).send('Error: ' + reason));
}

exports.uploadFileToProcess = async (req, res) => {
    return await s3Service.uploadFileToProcess(req.body)
        .then(value => {res.send('File uploaded!')})
        .catch(reason => res.status(500).send('Error: ' + reason));
}

exports.getAllCalculation = async (req, res) => {
    return await service.listAllCalculation()
        .then(value => res.send(value))
        .catch(reason => res.status(500).send('Error: ' + reason));
}

exports.startProcessing = async (req, res) => {
    return await service.processAllFiles()
        .then(() => res.send("Started!"))
        .catch(reason => res.status(500).send('Error: ' + reason));
}