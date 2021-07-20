require("dotenv").config();
const Calculation = require("../calculation/calculation.model");
const Product = require("../products/product.model");
const s3Service = require("../amazon/amazonS3.service");
const cron = require("node-cron");

cron.schedule("*/5 * * * *", () => {
  this.processAllFiles();
}, {});

exports.deleteCalculations = async (ids) => {
  if (!ids.length) {
    throw new Error("Empty id list to delete!");
  }

  return await Calculation.deleteMany({_id: ids})
    .then((value) => {
      if (value.deletedCount === 0) {
        throw new Error("No id found to delete!");
      }
      return "Calculations deleted!";
    }).catch((reason) => {
      throw new Error(reason);
    });
};

exports.uploadFile = async (fileModel) => {
  const ext = fileModel.name.substr(fileModel.name.lastIndexOf(".") + 1);
  if (ext !== "jsonl" || !ext) {
    throw new Error("Invalid Format. JSONL only allowed!");
  } else if (!fileModel.base64) {
    throw new Error("Content file not defined!");
  } else if (Buffer.from(fileModel.base64).length > 3000) {
    throw new Error("File too large. Max size: 3MB");
  }
  return s3Service.uploadFileToProcess(fileModel)
    .then(() => "Uploaded!")
    .catch(() => {
      throw new Error("Cannot upload file to process!");
    });
};

exports.calculateCostsByYear = async (kwhYear) => {
  if (!kwhYear) throw new Error("KwYear is required!");
  return await Product.find()
    .then((products) => {
      const consumption = {
        kwhYear: kwhYear,
        products: [],
      };
      products.forEach((p) => {
        const product = {
          name: p.tariffName,
          totalYear: calculateTotal(p, kwhYear),
        };
        consumption.products.push(product);
      });
      consumption.products = consumption.products
        .sort((a, b) => (a.totalYear.totalCosts > b.totalYear.totalCosts) ?
          1 :
          ((b.totalYear.totalCosts > a.totalYear.totalCosts) ? -1 : 0));
      return consumption;
    }).catch(() => {
      throw new Error("Error to calculate costs per year");
    });
};

const calculateTotal = (product, kwhYear) => {
  if (product.rule === "basic" || product.rule !== "packaged") {
    return getCostsBasicOrDefault(product, kwhYear);
  }
  return getCostsPackaged(kwhYear, product);
};

function getCostsBasicOrDefault(product, kwhYear) {
  const baseCostsYear = product.baseCostMonth * 12;
  const kwhCostsYear = product.costKwh * kwhYear;
  return {
    baseCostsYear: baseCostsYear,
    kwhCostsYear: kwhCostsYear,
    totalCosts: baseCostsYear + kwhCostsYear,
  };
}

function getCostsPackaged(kwhYear, product) {
  let baseCostsYear = "Less than 4000 Kwh/Year or equal";
  let kwhCostsYear = "Less than 4000 Kwh/Year or equal";
  let total = 800;

  if (kwhYear > 4000) {
    const exceeded = kwhYear - 4000;
    baseCostsYear = product.baseCostMonth;
    kwhCostsYear = product.costKwh * exceeded;
    total = total + kwhCostsYear;
  }

  return {
    baseCostsYear: baseCostsYear,
    kwhCostsYear: kwhCostsYear,
    totalCosts: total,
  };
}

exports.listAllCalculation = async () => {
  return Calculation.find();
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
                      .catch(() => {
                        throw new Error("Cannot save calculation to mongodb");
                      });
                    s3Service.deleteFileById(fileName)
                      .then((value) => value)
                      .catch(() => {
                        throw new Error("Cannot delete file from bucket");
                      });
                  }).catch(() => {
                    throw new Error("Cannot calculate costs by year");
                  });
              });
          }).catch(() => {
            throw new Error("Cannot download file to process");
          });
      });
      return "Processing started!";
    }).catch(() => {
      throw new Error("Cannot list all files to process!");
    });
};
