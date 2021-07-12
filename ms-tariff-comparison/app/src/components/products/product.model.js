const mongoose = require('mongoose');

const ProductModel = mongoose.Schema({
    tariffName: String,
    baseCostMonth: Number,
    costKwh: Number,
    rule: String
}, {
    timestamp: true
});

module.exports  = mongoose.model('Product', ProductModel);