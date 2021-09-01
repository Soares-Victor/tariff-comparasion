exports.deleteCalculations = {
  "n": 1,
  "ok": 1,
  "deletedCount": 2
}
exports.deleteProduct = {
  "values": {
    "baseCost": 5,
    "kwhCost": 0.22,
    "maxConsumption": null
  },
  "_id": "61168e77a87945762e687de6",
  "tariffName": "Basic Month 2000",
  "description": "Basic month tariff. (baseCost * 12 + kwhCost * consumptionKwh)",
  "month": true,
  "__v": 0
}
exports.updateProduct = {
  "values": {
    "baseCost": 5,
    "kwhCost": 0.22,
    "maxConsumption": null
  },
  "_id": "61168e9ce2824776e3691982",
  "tariffName": "Basic Month 2000",
  "description": "Basic month tariff. (baseCost * 12 + kwhCost * consumptionKwh)",
  "month": true,
  "__v": 0
};
exports.deleteProductNotFound = {
  "name": "61168e77a87945762e687ded product not found!",
  "statusCode": 404,
  "isOperational": true
}
exports.updateProductError = {
  "tariffName": "Basic Month 2000",
  "description": "Basic month tariff. (baseCost * 12 + kwhCost * consumptionKwh)",
  "month": true,
  "values": {
    "baseCost": 5,
    "kwhCost": 0.22,
    "maxConsumption": null
  }
}
exports.mockCalculateCost = {
  "kwhYear": 4500,
  "products": [
    {
      "name": "Packaged Annual",
      "description": "Packaged Annual tariff. (kwhused - maxConsumption = exceeded * kwhCost)",
      "charger": "Annual",
      "totalYear": {
        "baseCostsYear": 800,
        "kwhCostsYear": 150,
        "totalCosts": 950,
      },
    },
    {
      "name": "Basic Month",
      "description": "Basic month tariff. (baseCost * 12 + kwhCost * consumptionKwh)",
      "charger": "Month",
      "totalYear": {
        "baseCostsYear": 60,
        "kwhCostsYear": 990,
        "totalCosts": 1050,
      },
    },
  ],
};
exports.productFindAll = [
  {
    "tariffName": "Basic Month",
    "description": "Basic month tariff. (baseCost * 12 + kwhCost * consumptionKwh)",
    "month": true,
    "values": {
      "baseCost": 5,
      "kwhCost": 0.22,
      "maxConsumption": null,
    },
  },
  {
    "tariffName": "Packaged Annual",
    "description": "Packaged Annual tariff. (kwhused - maxConsumption = exceeded * kwhCost)",
    "month": false,
    "values": {
      "baseCost": 800,
      "kwhCost": 0.30,
      "maxConsumption": 4000,
    },
  },
];
exports.listAllCalculation = [
  {
    "person": {
      "firstName": "Victor",
      "lastName": "Soares",
    },
    "_id": "60e5b62427d1044e006f8209",
    "dateProcessed": "2021-07-07T14:11:48.415Z",
    "installNumber": "10203040",
    "totalCosts": {
      "kwhYear": 4500,
      "products": [
        {
          "name": "Packaged Electricity Tariff",
          "totalYear": {
            "baseCostsYear": 800,
            "kwhCostsYear": 150,
            "totalCosts": 950,
          },
        },
        {
          "name": "Basic Electricity Tariff",
          "totalYear": {
            "baseCostsYear": 60,
            "kwhCostsYear": 990,
            "totalCosts": 1050,
          },
        },
      ],
    },
    "__v": 0,
  },
];
exports.listAllFileNames = ["calculationToProcess.jsonl", "file2.jsonl"];
exports.deleteFileToProcess = {
  "Deleted": [
    {
      "Key": "calculationToProcess.jsonl",
      "VersionId": "None"
    }
  ],
  "Errors": []
};
exports.createNewProduct = {
  "_id": "612420fa482e452b77349086",
  "tariffName": "Packaged Annual",
  "description": "Packaged Annual tariff. (kwhused - maxConsumption = exceeded * kwhCost)",
  "month": false,
  "values": {
    "baseCost": 800,
    "kwhCost": 0.3,
    "maxConsumption": 4000
  },
  "__v": 0
};
exports.productSave = {};
exports.uploadFileToProcess = {
  "name": "calculationToProcess.jsonl",
  "base64": "eyJmaXJzdE5hbWUiOiJWaWN0b3IiLCJsYXN0TmFtZSI6IlN" +
      "vYXJlcyIsImluc3RhbGxOdW1iZXIiOiIxMDIwMzA0MCIsImt3aFllYX" +
      "IiOiA0NTAwfQp7ImZpcnN0TmFtZSI6IkRhaWFuZSIsImxhc3ROYW1lIjo" +
      "iQmV6ZXJyYSIsImluc3RhbGxOdW1iZXIiOiIxMjM0NDU2Iiwia3doWWVhci" +
      "I6IDM1MDB9",
};
exports.downloadFileToProcess = {
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
      34,
      102,
      105,
      114,
      115,
      116,
      78,
      97,
      109,
      101,
      34,
      58,
      34,
      86,
      105,
      99,
      116,
      111,
      114,
      34,
      44,
      34,
      108,
      97,
      115,
      116,
      78,
      97,
      109,
      101,
      34,
      58,
      34,
      83,
      111,
      97,
      114,
      101,
      115,
      34,
      44,
      34,
      105,
      110,
      115,
      116,
      97,
      108,
      108,
      78,
      117,
      109,
      98,
      101,
      114,
      34,
      58,
      34,
      49,
      48,
      50,
      48,
      51,
      48,
      52,
      48,
      34,
      44,
      34,
      107,
      119,
      104,
      89,
      101,
      97,
      114,
      34,
      58,
      32,
      52,
      53,
      48,
      48,
      125,
      10,
      123,
      34,
      102,
      105,
      114,
      115,
      116,
      78,
      97,
      109,
      101,
      34,
      58,
      34,
      68,
      97,
      105,
      97,
      110,
      101,
      34,
      44,
      34,
      108,
      97,
      115,
      116,
      78,
      97,
      109,
      101,
      34,
      58,
      34,
      66,
      101,
      122,
      101,
      114,
      114,
      97,
      34,
      44,
      34,
      105,
      110,
      115,
      116,
      97,
      108,
      108,
      78,
      117,
      109,
      98,
      101,
      114,
      34,
      58,
      34,
      49,
      50,
      51,
      52,
      52,
      53,
      54,
      34,
      44,
      34,
      107,
      119,
      104,
      89,
      101,
      97,
      114,
      34,
      58,
      32,
      51,
      53,
      48,
      48,
      125,
    ],
  }),
};
