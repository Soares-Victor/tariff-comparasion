const controller = require("./costs.controller");
require("dotenv").config();

module.exports = (app) => {
  const pathCosts = "/costs";

  app.post(process.env.ROOT_PATH + pathCosts + "/calculate",
    controller.calculateCostsByYear);

  app.post(process.env.ROOT_PATH + pathCosts + "/upload",
    controller.uploadFileToProcess);

  app.get(process.env.ROOT_PATH + pathCosts + "/calculation/listall",
    controller.getAllCalculation);

  app.get(process.env.ROOT_PATH + pathCosts + "/process/start",
    controller.startProcessing);
};
