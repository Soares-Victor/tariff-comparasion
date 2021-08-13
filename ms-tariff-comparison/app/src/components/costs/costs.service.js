require("dotenv").config();
const Calculation = require("../calculation/calculation.model");
const Product = require("../products/product.model");
const s3Service = require("../amazon/amazonS3.service");
const cron = require("node-cron");
const logger = require("../../logger/logger");
const InternalServerError = require("../../error/models/internalServerError");
const BadRequestError = require("../../error/models/badRequestError");
const NotFoundError = require("../../error/models/notFoundError");

cron.schedule("*/5 * * * *", () => {
  this.processAllFiles()
    .then((value) => logger.info(value))
    .catch((reason) => logger.error(reason.message));
}, {});

exports.listAllFilesToProcess = async () => {
  return await s3Service.listAllToProcess()
    .then((value) => value)
    .catch(() => {
      throw new InternalServerError("Cannot list all files to process");
    });
};

exports.deleteFilesById = async (filesName) => {
  return await s3Service.deleteFiles(filesName)
    .then((value) => value)
    .catch(() => {
      throw new NotFoundError("No files found to delete!");
    });
};

exports.deleteCalculations = async (ids) => {
  if (!ids.length) {
    throw new BadRequestError("Empty id list to delete!");
  }

  return await Calculation.deleteMany({_id: ids})
    .then((value) => {
      if (value.deletedCount === 0) {
        throw new NotFoundError("No id found to delete!");
      }
      return value;
    }).catch((reason) => {
      throw reason;
    });
};

exports.uploadFile = async (fileModel) => {
  return Promise.all(fileModel)
    .then((values) => {
      values.forEach((file) => {
        if (file.name.substr(file.name.lastIndexOf(".") + 1) !== "jsonl") {
          throw new BadRequestError("Invalid Format. JSONL only allowed!");
        } else if (!file.base64) {
          throw new BadRequestError("Content file not defined!");
        } else if (Buffer.from(file.base64).length > 3000) {
          throw new BadRequestError("File too large. Max size: 3MB");
        }
      });
      values.forEach((file) => {
        s3Service.uploadFileToProcess(file);
      });
      return values;
    })
      .catch(reason => {
          throw reason;
      })
};

exports.calculateCostsByYear = async (kwhYear) => {
  if (!kwhYear) throw new BadRequestError("KwYear is required!");
  return await Product.find()
    .then((products) => {
      const consumption = {
        kwhYear: kwhYear,
        products: [],
      };
      products.forEach((p) => {
        const product = {
          name: p.tariffName,
          description: p.description,
          charger: p.month ? "Month" : "Annual",
          totalYear: calculateTotal(p, kwhYear),
        };
        consumption.products.push(product);
      });
      consumption.products = consumption.products
        .sort((a, b) => (a.totalYear.totalCosts > b.totalYear.totalCosts) ?
          1 :
          ((b.totalYear.totalCosts > a.totalYear.totalCosts) ? -1 : 0));
      return consumption;
    }).catch((reason) => {
      throw reason;
    });
};

const calculateTotal = (product, kwhYear) => {
  let baseCostsYear = 0;
  let kwhCostYear = 0;
  const totalYear = {};

  if (product.month) {
    baseCostsYear = product.values.baseCost * 12;
    kwhCostYear = product.values.kwhCost * kwhYear;
    totalYear.baseCostsYear = baseCostsYear;
    totalYear.kwhCostsYear = kwhCostYear;
    totalYear.totalCosts = baseCostsYear + kwhCostYear;
  } else {
    if (kwhYear > product.values.maxConsumption) {
      const exceeded = kwhYear - product.values.maxConsumption;
      baseCostsYear = product.values.baseCost;
      kwhCostYear = product.values.kwhCost * exceeded;
      totalYear.baseCostsYear = baseCostsYear;
      totalYear.kwhCostsYear = kwhCostYear;
      totalYear.totalCosts = baseCostsYear + kwhCostYear;
    } else {
      const baseTotalMsg =
          `Using less then:${product.values.maxConsumption} KWH/Year. Charge annual tariff: ${product.values.baseCost}`;
      totalYear.baseCostsYear = baseTotalMsg;
      totalYear.kwhCostsYear = baseTotalMsg;
      totalYear.totalCosts = product.values.baseCost;
    }
  }

  return totalYear;
};

exports.listAllCalculation = async () => {
  return Calculation.find()
      .then(value => value)
      .catch(reason => {
          throw new InternalServerError(reason.message)
      });
};


exports.processAllFiles = async () => {
  return await s3Service.listAllToProcess()
    .then((fileNames) => {
      fileNames.forEach((fileName) => {
        s3Service.downloadFileToProcess(fileName)
          .then((fileData) => {
            fileData.Body.toString().split("\n")
              .forEach((l) => {
                const line = JSON.parse(l);
                this.calculateCostsByYear(line["kwhYear"])
                  .then((cost) => {
                    const calculation = new Calculation({
                      dateProcessed: new Date().toISOString(),
                      installNumber: line["installNumber"],
                      person: {
                        firstName: line["firstName"],
                        lastName: line["lastName"],
                      },
                      totalCosts: cost,
                    });
                    calculation.save()
                      .catch((reason) => {
                        throw new InternalServerError(reason.message);
                      });
                    s3Service.deleteFileById(fileName)
                      .then((value) => value)
                      .catch((reason) => {
                        throw new InternalServerError(reason.message);
                      });
                  }).catch((reason) => {
                    throw reason;
                  });
              });
          }).catch((reason) => {
            throw new InternalServerError(reason.message);
          });
      });
      return fileNames;
    }).catch((reason) => {
      throw reason;
    });
};
