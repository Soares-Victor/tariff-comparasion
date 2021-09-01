const mongoose = require("mongoose");

const ProductModel = mongoose.Schema({
  tariffName: String,
  description: String,
  month: Boolean,
  values: {
    baseCost: Number,
    kwhCost: Number,
    maxConsumption: Number,
  },
}, {
  timestamp: true,
});

module.exports = mongoose.model("Product", ProductModel);
