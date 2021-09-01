const service = require('./calculation.service')
const logger = require("../../logger/logger");

exports.deleteCalculations = async (req, res) => {
    return await service.deleteCalculations(req.body)
        .then((value) => {
            logger.info(value);
            res.send(value);
        })
        .catch((reason) => {
            logger.error(reason.name);
            res.status(reason.statusCode || 500).send(reason);
        });
};

exports.calculateCostsByYear = async (req, res) => {
    return await service.calculateCostsByYear(req.params.kwhYear)
        .then((value) => {
            logger.info(value);
            res.send(value);
        })
        .catch((reason) => {
            logger.error(reason.name);
            res.status(reason.statusCode || 500).send(reason);
        });
};

exports.getAllCalculation = async (req, res) => {
    return await service.listAllCalculation()
        .then((value) => {
            logger.info(value);
            res.send(value);
        })
        .catch((reason) => {
            logger.error(reason.name);
            res.status(reason.statusCode || 500).send(reason);
        });
};