require("dotenv").config();
const Product = require("./product.model");

exports.deleteById = async (id) => {
  return await Product.findByIdAndRemove(id)
    .then(() => "Product deleted: " + id)
    .catch(() => {
      throw new Error(id + " not found!");
    });
};

exports.findAllProduct = async () => {
  return await Product.find()
    .then((value) => value)
    .catch(() => {
      throw new Error("Error to list all Products!");
    });
};

exports.createProduct = async (productModel) => {
  if (!productModel.tariffName) {
    throw new Error("Tariff Name is a required field!");
  }
  if (!productModel.baseCostMonth) {
    throw new Error("Base Cost Month is a required field!");
  }
  if (!productModel.costKwh) {
    throw new Error("Cost KWH is a required field!");
  }
  return (await Product.create({
    tariffName: productModel.tariffName,
    baseCostMonth: productModel.baseCostMonth,
    costKwh: productModel.costKwh,
    rule: productModel.rule,
  }).then(() => "Product created!")
    .catch(() => {
      throw new Error("Error to save Product!");
    }));
};

exports.update = async (id, productModel) => {
  if (!id) {
    throw new Error("Id is a required field!");
  }
  if (!productModel.tariffName) {
    throw new Error("Tariff Name is a required field!");
  }
  if (!productModel.baseCostMonth) {
    throw new Error("Base Cost Month is a required field!");
  }
  if (!productModel.costKwh) {
    throw new Error("Cost KWH is a required field!");
  }
  return Product.findOneAndUpdate(id, {
    tariffName: productModel.tariffName,
    baseCostMonth: productModel.baseCostMonth,
    costKwh: productModel.costKwh,
    rule: productModel.rule,
  }, {new: true})
    .then(() => "Product created!")
    .catch(() => {
      throw new Error("Error to find and update!");
    });
};

