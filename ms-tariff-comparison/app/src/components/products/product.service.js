require("dotenv").config();
const Product = require("./product.model");

exports.deleteById = async (id) => {
  return Product.findByIdAndRemove(id);
};

exports.findAllProduct = async () => {
  return Product.find();
};

exports.createProduct = async (productModel) => {
  return (await Product.create({
    tariffName: productModel.tariffName,
    baseCostMonth: productModel.baseCostMonth,
    costKwh: productModel.costKwh,
    rule: productModel.rule,
  }));
};

exports.update = async (id, productModel) => {
  return Product.findOneAndUpdate(id, {
    tariffName: productModel.tariffName,
    baseCostMonth: productModel.baseCostMonth,
    costKwh: productModel.costKwh,
    rule: productModel.rule,
  }, {new: true});
};

