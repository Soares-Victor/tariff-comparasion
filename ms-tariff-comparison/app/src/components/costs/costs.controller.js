const service = require("./costs.service");

exports.calculateCostsByYear = async (req, res) => {
  return await service.calculateCostsByYear(req.body.kwhYear)
    .then((value) => res.send(value))
    .catch((reason) => res.status(500).send("Error: " + reason));
};

exports.uploadFileToProcess = async (req, res) => {
  return await service.uploadFile(req.body)
    .then((value) => res.send(value))
    .catch((reason) => res.status(500).send(reason.message));
};

exports.getAllCalculation = async (req, res) => {
  return await service.listAllCalculation()
    .then((value) => res.send(value))
    .catch((reason) => res.status(500).send("Error: " + reason));
};

exports.startProcessing = async (req, res) => {
  return await service.processAllFiles()
    .then(() => res.send("Started!"))
    .catch((reason) => res.status(500).send("Error: " + reason));
};
