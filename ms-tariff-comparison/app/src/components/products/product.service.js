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
  if (isSetRequiredFields(productModel)) {
    return (await Product.create({
      tariffName: productModel.tariffName,
      description: productModel.description,
      month: productModel.month,
      values: {
        baseCost: productModel.values.baseCost,
        kwhCost: productModel.values.kwhCost,
        maxConsumption: productModel.values.maxConsumption,
      },
    }).then(() => "Product created!")
      .catch(() => {
        throw new Error("Error to save Product!");
      }));
  }
};

exports.update = async (id, productModel) => {
  if (isSetRequiredFields(productModel)) {
    return Product.findByIdAndUpdate(id, {
      tariffName: productModel.tariffName,
      description: productModel.description,
      month: productModel.month,
      values: {
        baseCost: productModel.values.baseCost,
        kwhCost: productModel.values.kwhCost,
        maxConsumption: productModel.values.maxConsumption,
      },
    }, {new: true, useFindAndModify: false})
      .then(() => "Product updated!")
      .catch(() => {
        throw new Error("Error to find and update!");
      });
  }
};

function isSetRequiredFields(productModel) {
  if (!productModel.tariffName) throw new Error("Tariff Name is a required field!");
  else if (!productModel.description) throw new Error("Description is a required field!");
  else if (productModel.month === null) throw new Error("Month is a required field!");
  else if (!productModel.values.baseCost) throw new Error("Base Cost is a required field!");
  else if (!productModel.values.kwhCost) throw new Error("Cost per KWH is a required field!");
  else if (!productModel.month && !productModel.values.maxConsumption) {
    throw new Error("Max consumption KWH is a required field when is a year charge!");
  }
  return true;
}
