require("dotenv").config();
const Calculation = require("../calculations/calculation.model");
const s3Service = require("../amazon/amazonS3.service");
const calculationService = require("../calculations/calculation.service");
const cron = require("node-cron");
const InternalServerError = require("../../error/models/internalServerError");
const BadRequestError = require("../../error/models/badRequestError");
const NotFoundError = require("../../error/models/notFoundError");

cron.schedule("*/7 * * * *", () => {
  this.processAllFiles()}, {});

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
    .catch((reason) => {
      throw reason;
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
                calculationService.calculateCostsByYear(line["kwhYear"])
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
