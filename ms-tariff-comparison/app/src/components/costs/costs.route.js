const controller = require("./costs.controller");
require("dotenv").config();

module.exports = (app) => {
  const pathCosts = "/costs";

  app.post(process.env.ROOT_PATH + pathCosts + "/calculate",
    controller.calculateCostsByYear);

  app.post(process.env.ROOT_PATH + pathCosts + "/upload",
    controller.uploadFileToProcess);

  app.get(process.env.ROOT_PATH + pathCosts + "/file/toprocess/listall",
    controller.listAllToProcess);

  app.delete(process.env.ROOT_PATH + pathCosts + "/file/toprocess/delete",
    controller.deleteFilesById);

  app.get(process.env.ROOT_PATH + pathCosts + "/calculation/listall",
    controller.getAllCalculation);

  app.get(process.env.ROOT_PATH + pathCosts + "/process/start",
    controller.startProcessing);

  app.delete(process.env.ROOT_PATH + pathCosts + "/delete",
    controller.deleteCalculations);
};
