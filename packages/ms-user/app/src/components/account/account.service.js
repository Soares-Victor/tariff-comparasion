const Account = require("./account.model");
const awsService = require("../amazon/amazonS3.service");
const InternalServerError = require("error/models/internalServerError");
const BadRequestError = require("error/models/badRequestError");

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
      throw new InternalServerError(`Cannot find account ${username} and ${client}`);
    })
    .catch((reason) => {
      throw reason;
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
            .then((value) => value)
            .catch((reason) => {
              throw new InternalServerError(reason.message);
            });
        }
        return value;
      })
      .catch((reason) => {
        throw reason;
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
    throw new BadRequestError("Username is a required field!");
  } else if (!accountReq.client) {
    throw new BadRequestError("Client is a required field!");
  } else if (!accountReq.firstName) {
    throw new BadRequestError("First Name is a required field!");
  } else if (!accountReq.lastName) {
    throw new BadRequestError("Last Name is a required field!");
  } else if (!accountReq.email) {
    throw new BadRequestError("Email is a required field!");
  }
  return true;
}
