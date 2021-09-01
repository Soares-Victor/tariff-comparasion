const controller = require("./file.controller");
require("dotenv").config();

module.exports = (app) => {
  const pathCosts = "/files";

  app.post(process.env.ROOT_PATH + pathCosts,
    controller.uploadFileToProcess);

  app.get(process.env.ROOT_PATH + pathCosts,
    controller.listAllToProcess);

  app.delete(process.env.ROOT_PATH + pathCosts,
    controller.deleteFilesById);

  app.post(process.env.ROOT_PATH + pathCosts + "/process/starts",
    controller.startProcessing);

};
