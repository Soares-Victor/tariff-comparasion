const controller = require('../controllers/product.contoller')
require('dotenv').config();

module.exports = (app) => {

    const pathProduct = '/product';

    app.post(process.env.ROOT_PATH + pathProduct + '/create', controller.createProduct);
    app.put(process.env.ROOT_PATH + pathProduct + '/update/id/:id', controller.updateById);
    app.delete(process.env.ROOT_PATH + pathProduct + '/delete/id/:id', controller.deleteById);
    app.get(process.env.ROOT_PATH + pathProduct + '/listall', controller.findAllProduct);

}