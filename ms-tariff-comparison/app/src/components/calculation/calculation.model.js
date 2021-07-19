const mongoose = require("mongoose");

const CalculationModel = mongoose.Schema({
  installNumber: String,
  dateProcessed: String,
  person: {
    firstName: String,
    lastName: String,
  },
  totalCosts: {},
}, {
  timestamp: true,
});

module.exports = mongoose.model("Calculation", CalculationModel);
