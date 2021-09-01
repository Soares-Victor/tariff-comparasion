exports.getAccountSuccess = {
  "address": {
    "street": "",
    "city": "",
    "number": "",
    "zipCode": "",
    "country": "",
  },
  "username": "user3",
  "client": "common",
  "firstName": "Victor",
  "lastName": "Neves",
  "email": "victor.soares@live.it",
  "photoId": "common_user3.png",
  "phone": "",
  "photoBase64": "test",
  "_doc": {},
};

exports.saveAccountSuccess = {
  "username": "user3",
  "client": "common",
  "firstName": "Victor",
  "lastName": "Neves",
  "email": "victor.soares@live.it",
  "phone": "",
  "photoBase64": "testNew",
  "address": {
    "street": "",
    "city": "",
    "number": "",
    "zipCode": "",
    "country": "",
  },
};


exports.saveAccountUserNameNull = {
  "username": "",
  "client": "common",
  "firstName": "Victor",
  "lastName": "Neves",
  "email": "victor.soares@live.it",
  "phone": "",
  "photoBase64": "testNew",
  "address": {
    "street": "",
    "city": "",
    "number": "",
    "zipCode": "",
    "country": "",
  },
};

exports.saveAccountClientNull = {
  "username": "user",
  "client": "",
  "firstName": "Victor",
  "lastName": "Neves",
  "email": "victor.soares@live.it",
  "phone": "",
  "photoBase64": "testNew",
  "address": {
    "street": "",
    "city": "",
    "number": "",
    "zipCode": "",
    "country": "",
  },
};

exports.saveAccountFirstNameNull = {
  "username": "user",
  "client": "common",
  "firstName": "",
  "lastName": "Neves",
  "email": "victor.soares@live.it",
  "phone": "",
  "photoBase64": "testNew",
  "address": {
    "street": "",
    "city": "",
    "number": "",
    "zipCode": "",
    "country": "",
  },
};

exports.saveAccountLastNameNull = {
  "username": "user",
  "client": "common",
  "firstName": "Victor",
  "lastName": "",
  "email": "victor.soares@live.it",
  "phone": "",
  "photoBase64": "testNew",
  "address": {
    "street": "",
    "city": "",
    "number": "",
    "zipCode": "",
    "country": "",
  },
};


exports.saveAccountEmailNull = {
  "username": "user",
  "client": "common",
  "firstName": "Victor",
  "lastName": "Soares",
  "email": "",
  "phone": "",
  "photoBase64": "testNew",
  "address": {
    "street": "",
    "city": "",
    "number": "",
    "zipCode": "",
    "country": "",
  },
};


exports.downloadFoto = {
  "AcceptRanges": "bytes",
  "LastModified": "2021-07-07T14:25:41.000Z",
  "ContentLength": 171,
  "ETag": "\"b605bdcaefb5fb09d8524e90c31a985a\"",
  "ContentLanguage": "en-US",
  "ContentType": "application/octet-stream",
  "Metadata": {},
  "Body": new Buffer({
    "type": "Buffer",
    "data": [
      123,
    ],
  }),
};
