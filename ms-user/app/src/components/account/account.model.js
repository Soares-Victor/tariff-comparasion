const mongoose = require("mongoose");

const AccountModel = mongoose.Schema({

  username: String,
  client: String,
  firstName: String,
  lastName: String,
  email: String,
  photoId: String,
  address: {
    street: String,
    city: String,
    number: String,
    zipCode: String,
    country: String,
  },
  phone: String,
}, {
  timestamp: true,
});

module.exports = mongoose.model("Account", AccountModel);
