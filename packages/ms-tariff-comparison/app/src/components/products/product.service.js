require("dotenv").config();
const Product = require("./product.model");
const BadRequestError = require("../../error/models/badRequestError");
const InternalServerError = require("../../error/models/internalServerError");
const NotFoundError = require("../../error/models/notFoundError");

exports.deleteById = async (id) => {
  return await Product.findByIdAndRemove(id, {useFindAndModify: false})
    .then((value) => {
      if (!value) throw new NotFoundError(`${id} product not found!`);
      return value;
    })
    .catch((reason) => {
      throw reason;
    });
};

exports.findAllProduct = async () => {
  return await Product.find()
    .then((value) => value)
    .catch(() => {
      throw new InternalServerError("Error to list all Products!");
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
    }).then((value) => value)
      .catch((reason) => {
        throw reason;
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
      .then((value) => {
        if (!value) throw new NotFoundError(`Product ${id} not found!`);
        return value;
      })
      .catch((reason) => {
        throw reason;
      });
  }
};

function isSetRequiredFields(productModel) {
  if (!productModel.tariffName) throw new BadRequestError("Tariff Name is a required field!");
  else if (!productModel.description) throw new BadRequestError("Description is a required field!");
  else if (productModel.month === null) throw new BadRequestError("Month is a required field!");
  else if (!productModel.values.baseCost) throw new BadRequestError("Base Cost is a required field!");
  else if (!productModel.values.kwhCost) throw new BadRequestError("Cost per KWH is a required field!");
  else if (!productModel.month && !productModel.values.maxConsumption) {
    throw new BadRequestError("Max consumption KWH is a required field when is a year charge!");
  }
  return true;
}
