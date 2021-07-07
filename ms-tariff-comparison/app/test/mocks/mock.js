exports.mockCalculateCost = {
    "kwhYear": 4500,
    "products": [
        {
            "name": "Packaged Electricity Tariff",
            "totalYear": {
                "baseCostsYear": 800,
                "kwhCostsYear": 150,
                "totalCosts": 950
            }
        },
        {
            "name": "Basic Electricity Tariff",
            "totalYear": {
                "baseCostsYear": 60,
                "kwhCostsYear": 990,
                "totalCosts": 1050
            }
        }
    ]
}
exports.productFindAll = [
    {
        "_id": "60e4b0a7d680628585ec9363",
        "tariffName": "Packaged Electricity Tariff",
        "baseCostMonth": 800,
        "costKwh": 0.3,
        "rule": "packaged"
    },
    {
        "_id": "60e4b0a7d680628585ec9364",
        "tariffName": "Basic Electricity Tariff",
        "baseCostMonth": 5,
        "costKwh": 0.22,
        "rule": "basic"
    }
]
exports.listAllCalculation = [
    {
        "person": {
            "firstName": "Victor",
            "lastName": "Soares"
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
                        "totalCosts": 950
                    }
                },
                {
                    "name": "Basic Electricity Tariff",
                    "totalYear": {
                        "baseCostsYear": 60,
                        "kwhCostsYear": 990,
                        "totalCosts": 1050
                    }
                }
            ]
        },
        "__v": 0
    }
]
exports.listAllFileNames = ["calculationToProcess.jsonl", "file2.jsonl"]
exports.deleteFileToProcess = {};
exports.createNewProduct = {
    "tariffName": "Packaged Electricity Tariff",
    "baseCostMonth": 800,
    "costKwh": 0.30,
    "rule": "packaged"
}
exports.productSave = {}
exports.uploadFileToProcess = {
    "name": "calculationToProcess.jsonl",
    "base64": "eyJmaXJzdE5hbWUiOiJWaWN0b3IiLCJsYXN0TmFtZSI6IlNvYXJlcyIsImluc3RhbGxOdW1iZXIiOiIxMDIwMzA0MCIsImt3aFllYXIiOiA0NTAwfQp7ImZpcnN0TmFtZSI6IkRhaWFuZSIsImxhc3ROYW1lIjoiQmV6ZXJyYSIsImluc3RhbGxOdW1iZXIiOiIxMjM0NDU2Iiwia3doWWVhciI6IDM1MDB9"
}
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
            125
        ]
    })
}