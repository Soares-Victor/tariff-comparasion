const service = require("./product.service");
const logger = require("../../logger/logger");

exports.createProduct = async (req, res) => {
  return await service.createProduct(req.body)
    .then((value) => {
      logger.info(value);
      res.status(201).send(value);
    })
    .catch((reason) => {
      logger.error(reason.name);
      res.status(reason.statusCode || 500).send(reason);
    });
};

exports.findAllProduct = async (req, res) => {
  return await service.findAllProduct()
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason.name);
      res.status(reason.statusCode || 500).send(reason);
    });
};

exports.deleteById = async (req, res) => {
  return await service.deleteById(req.params.id)
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason.name);
      res.status(reason.statusCode || 500).send(reason);
    });
};

exports.updateById = async (req, res) => {
  return await service.update(req.params.id, req.body)
    .then((value) => {
      logger.info(value);
      res.send(value);
    })
    .catch((reason) => {
      logger.error(reason.name);
      res.status(reason.statusCode || 500).send(reason);
    });
};
