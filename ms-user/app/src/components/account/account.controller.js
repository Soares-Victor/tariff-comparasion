const logger = require("../../logger/logger");
const service = require("./account.service");

exports.saveAccount = async (req, res) => {
  return await service.saveAccount(req.body)
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason.message);
      res.status(500).send(reason.message);
    });
};

exports.getAccount = async (req, res) => {
  return await service.getAccount(req.params.id, req.params.client)
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason.message);
      res.status(500).send(reason.message);
    });
};
