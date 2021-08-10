require("dotenv").config();
const controller = require("./account.controller");

module.exports = (app) => {
  const pathRoute = "/account";

  app.post(process.env.ROOT_PATH + pathRoute, controller.saveAccount);

  app.get(process.env.ROOT_PATH + pathRoute + "/client/:client/me/:id", controller.getAccount);
};
