const Account = require("./account.model");
const awsService = require("../amazon/amazonS3.service");

exports.getAccount = async (username, client) => {
  return await Account.findOne({username: username.toLowerCase(), client: client.toLowerCase()})
    .then((value) => {
      if (value) {
        return awsService.downloadUserPhotoByFileName(value.photoId)
          .then((file) => {
            value["_doc"].photoBase64 = file.Body.toString("base64");
            return value;
          }).catch(() => value);
      }
      return `Account ${username} not found!`;
    })
    .catch(() => {
      throw new Error("Error to get account");
    });
};

exports.saveAccount = async (accountReq) => {
  if (isSetRequiredFields(accountReq)) {
    return await Account.findOneAndUpdate(
      {username: accountReq.username.toLowerCase(), client: accountReq.client.toLowerCase()},
      prepareAccount(accountReq), {new: true, useFindAndModify: false})
      .then((value) => {
        if (accountReq["photoBase64"]) {
          awsService.uploadUserPhoto(accountReq.client + "_" + accountReq.username + ".png", accountReq["photoBase64"]);
        }
        if (!value) {
          return Account.create(prepareAccount(accountReq))
            .then(() => "Account created!")
            .catch((reason) => {
              throw reason;
            });
        }
        return "Account updated!";
      })
      .catch(() => {
        throw new Error("Error to save account!");
      });
  }
};

function prepareAccount(accountReq) {
  const photoId = accountReq.client + "_" +accountReq.username + ".png";
  return {
    username: accountReq.username.toLowerCase(),
    client: accountReq.client.toLowerCase(),
    firstName: accountReq.firstName,
    lastName: accountReq.lastName,
    email: accountReq.email,
    photoId: photoId,
    phone: accountReq.phone,
    aboutMe: accountReq.aboutMe,
    linkedinLink: accountReq.linkedinLink,
    facebookLink: accountReq.facebookLink,
    address: {
      street: accountReq.address.street,
      city: accountReq.address.city,
      number: accountReq.address.number,
      zipCode: accountReq.address.zipCode,
      country: accountReq.address.country,
    },
  };
}

function isSetRequiredFields(accountReq) {
  if (!accountReq.username) {
    throw new Error("Username is a required field!");
  } else if (!accountReq.client) {
    throw new Error("Client is a required field!");
  } else if (!accountReq.firstName) {
    throw new Error("First Name is a required field!");
  } else if (!accountReq.lastName) {
    throw new Error("Last Name is a required field!");
  } else if (!accountReq.email) {
    throw new Error("Email is a required field!");
  }
  return true;
}
