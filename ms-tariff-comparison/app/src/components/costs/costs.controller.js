const service = require("./costs.service");
const logger = require("../../logger/logger");

exports.listAllToProcess = async (req, res) => {
  return await service.listAllFilesToProcess()
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason.message);
      res.status(500).send(reason.message);
    });
};

exports.deleteFilesById = async (req, res) => {
  return await service.deleteFilesById(req.body)
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason.message);
      res.status(500).send(reason.message);
    });
};

exports.deleteCalculations = async (req, res) => {
  return await service.deleteCalculations(req.body)
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason.message);
      res.status(500).send(reason.message);
    });
};

exports.calculateCostsByYear = async (req, res) => {
  return await service.calculateCostsByYear(req.body.kwhYear)
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason.message);
      res.status(500).send(reason.message);
    });
};

exports.uploadFileToProcess = async (req, res) => {
  return await service.uploadFile(req.body)
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason.message);
      res.status(500).send(reason.message);
    });
};

exports.getAllCalculation = async (req, res) => {
  return await service.listAllCalculation()
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason.message);
      res.status(500).send(reason.message);
    });
};

exports.startProcessing = async (req, res) => {
  return await service.processAllFiles()
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason.message);
      res.status(500).send(reason.message);
    });
};
