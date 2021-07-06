require('dotenv').config()
const Product = require('../model/product.model')

exports.deleteById = async (id) => {
    return Product.findByIdAndRemove(id);
}

exports.findAllProduct = async () => {
    return Product.find();
}

exports.createProduct = async (productModel) => {
    const product = new Product({
        tariffName: productModel.tariffName,
        baseCostMonth: productModel.baseCostMonth,
        costKwh: productModel.costKwh,
        rule: productModel.rule
    })
    return await product.save();
}

exports.update = async (id, productModel) => {
    return Product.findOneAndUpdate(id, {
        tariffName: productModel.tariffName,
        baseCostMonth: productModel.baseCostMonth,
        costKwh: productModel.costKwh,
        rule: productModel.rule
    }, {new: true});
}

