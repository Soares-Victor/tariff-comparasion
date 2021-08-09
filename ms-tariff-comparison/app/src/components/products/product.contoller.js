const service = require("./product.service");
const logger = require("../../logger/logger");

exports.createProduct = async (req, res) => {
  return await service.createProduct(req.body)
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason.message);
      res.status(500).send(reason.message);
    });
};

exports.findAllProduct = async (req, res) => {
  return await service.findAllProduct()
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason.message);
      res.status(500).send(reason.message);
    });
};

exports.deleteById = async (req, res) => {
  return await service.deleteById(req.params.id)
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason.message);
      res.status(500).send(reason.message);
    });
};

exports.updateById = async (req, res) => {
  return await service.update(req.params.id, req.body)
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason);
      res.status(500).send(reason.message);
    });
};
