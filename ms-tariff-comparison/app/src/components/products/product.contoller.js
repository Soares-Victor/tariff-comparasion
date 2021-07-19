const service = require("./product.service");

exports.createProduct = async (req, res) => {
  return await service.createProduct(req.body)
    .then((value) => res.send(value))
    .catch((reason) => res.status(500).send(reason.message));
};

exports.findAllProduct = async (req, res) => {
  return await service.findAllProduct()
    .then((value) => res.send(value))
    .catch((reason) => res.status(500).send(reason.message));
};

exports.deleteById = async (req, res) => {
  return await service.deleteById(req.params.id)
    .then((value) => res.send(value))
    .catch((reason) => res.status(500).send(reason.message));
};

exports.updateById = async (req, res) => {
  return await service.update(req.params.id, req.body)
    .then((value) => {
      if (!value) {
        return res.status(404).message(`Id ${req.params.id} not found!`);
      }
      res.send(`Product ${req.params.id} updated!`);
    }).catch((reason) => res.status(500).send(reason.message));
};
