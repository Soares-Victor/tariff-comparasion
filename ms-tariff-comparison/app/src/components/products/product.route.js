const controller = require("./product.contoller");
require("dotenv").config();

module.exports = (app) => {
  const pathProduct = "/products";

  app.post(process.env.ROOT_PATH + pathProduct,
    controller.createProduct);

  app.put(process.env.ROOT_PATH + pathProduct + "/:id",
    controller.updateById);

  app.delete(process.env.ROOT_PATH + pathProduct + "/:id",
    controller.deleteById);

  app.get(process.env.ROOT_PATH + pathProduct,
    controller.findAllProduct);
};
