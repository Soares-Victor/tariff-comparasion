const controller = require('./calculation.controller')
require("dotenv").config();

module.exports = (app) => {
    const pathCosts = "/calculations";

    app.get(process.env.ROOT_PATH + pathCosts + "/kwhyear/:kwhYear",
        controller.calculateCostsByYear);

    app.get(process.env.ROOT_PATH + pathCosts,
        controller.getAllCalculation);

    app.delete(process.env.ROOT_PATH + pathCosts,
        controller.deleteCalculations);
};
