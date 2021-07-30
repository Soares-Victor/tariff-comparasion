require("dotenv").config();
const costService = require("../src/components/costs/costs.service");
const productsService = require("../src/components/products/product.service");
const s3Service = require("../src/components/amazon/amazonS3.service");
const mocks = require("./mocks/mock");
const fs = require("fs");
const aws = require("aws-sdk");
const configAws = require("../src/components/amazon/aws.config");
const s3 = new aws.S3({
  endpoint: process.env.AWS_S3_ENDPOINT,
  params: configAws,
});
const Product = require("../src/components/products/product.model");
const Calculation = require("../src/components/calculation/calculation.model");

jest.useFakeTimers();

beforeAll(() => initMocksDefault());


describe("service costs", () => {
  describe("success", () => {
    beforeAll(() => initMockSuccess());

    it("should delete calculations", async () => {
      return await costService.deleteCalculations(["1", "2"])
        .then((value) => expect(value).toBe("Calculations deleted!"));
    });

    it("should upload file", async () => {
      return await costService.uploadFile([mocks.uploadFileToProcess])
        .then((value) => expect(value).toBe("Files Uploaded!"));
    });

    it("should list all files to process", async () => {
      return await costService.listAllFilesToProcess()
        .then((value) => expect(value).toBe(mocks.listAllFileNames));
    });

    it("should delete files by id", async () => {
      return await costService.deleteFilesById(["file1.jsonl"])
        .then((value) => expect(value).toBe("Deleted!"));
    });

    it("should calculate costs", async () => {
      return await costService.calculateCostsByYear(4500)
        .then((value) => expect(value).toEqual(mocks.mockCalculateCost));
    });

    it("should process all files", async () => {
      return await costService.processAllFiles()
        .then((value) => expect(value).toEqual("Processing started!"));
    });

    it("should list all calculation", async () => {
      return await costService.listAllCalculation()
        .then((value) => expect(value).toEqual(mocks.listAllCalculation));
    });
  });

  describe("exception", () => {
    beforeAll(() => initMockException());

    it("should gives exception by format file", async () => {
      const fileModel = mocks.uploadFileToProcess;
      fileModel.name = "file.pdf";
      return await costService.uploadFile([fileModel])
        .catch((reason) => expect(reason.message).toEqual("Invalid Format. JSONL only allowed!"));
    });

    it("should not calculate costs per year", async () => {
      return await costService.calculateCostsByYear(4500)
        .catch((reason) => expect(reason.message).toEqual("Error to calculate costs per year"));
    });

    it("should not delete file", async () => {
      return await costService.deleteFilesById("test.jsonl")
        .catch((reason) => expect(reason.message).toEqual("Cannot delete files!"));
    });

    it("should not delete empty list", async () => {
      return await costService.deleteCalculations([])
        .catch((reason) => expect(reason.message).toEqual("Empty id list to delete!"));
    });

    it("should not delete many", async () => {
      return await costService.deleteCalculations(["1", "2"])
        .catch((reason) => expect(reason.message).toEqual("Error"));
    });

    it("should not process all file", async () => {
      return await costService.processAllFiles()
        .catch((reason) => expect(reason.message).toEqual("Cannot list all files to process!"));
    });

    it("should not list all files to process", async () => {
      return await costService.listAllFilesToProcess()
        .catch((reason) => expect(reason.message).toEqual("Cannot list all files to process"));
    });
  });
});

describe("service products", () => {
  describe("success", () => {
    beforeAll(() => initMockSuccess());

    it("should create new product", async () => {
      return await productsService.createProduct(mocks.createNewProduct)
        .then((value) => expect(value).toEqual("Product created!"));
    });

    it("should list all products", async () => {
      return await productsService.findAllProduct()
        .then((value) => expect(value).toEqual(mocks.productFindAll));
    });

    it("should delete one product", async () => {
      return await productsService.deleteById(1)
        .then((value) => expect(value).toContain("Product deleted"));
    });

    it("should update a product", async () => {
      return await productsService.update(1, mocks.createNewProduct)
        .then((value) => expect(value).toEqual("Product updated!"));
    });
  });

  describe("exception", () => {
    beforeAll(() => initMockException());

    it("should not delete product by id", async () => {
      return await productsService.deleteById("1")
        .catch((reason) => expect(reason.message).toEqual("1 not found!"));
    });

    it("should not list all products", async () => {
      return await productsService.findAllProduct()
        .catch((reason) => expect(reason.message).toEqual("Error to list all Products!"));
    });

    it("should not save new product", async () => {
      return await productsService.createProduct(mocks.createNewProduct)
        .catch((reason) => expect(reason.message).toEqual("Error to save Product!"));
    });

    it("should not save new product", async () => {
      const product = mocks.createNewProduct;
      product.month = false;
      product.values.maxConsumption = null;
      return await productsService.createProduct(mocks.createNewProduct)
        .catch((reason) => expect(reason.message)
          .toEqual("Max consumption KWH is a required field when is a year charge!"));
    });
  });
});

const initMocksDefault = () => {
  jest.mock("../src/components/amazon/amazonS3.service");
  jest.mock("fs");
  jest.mock("aws-sdk");
  jest.mock("../src/components/costs/costs.service");
  jest.mock("../src/components/amazon/amazonS3.service");
  jest.mock("../src/components/products/product.service");
  jest.mock("../src/components/amazon/amazonS3.service");
};

const initMockSuccess = () => {
  fs.writeFile = jest.fn()
    .mockResolvedValue({});
  fs.readFile = jest.fn()
    .mockResolvedValue(mocks.downloadFileToProcess["Body"]);
  s3.upload = jest.fn()
    .mockResolvedValue({});
  s3.listObjects = jest.fn()
    .mockResolvedValue({});
  s3.getObject = jest.fn()
    .mockResolvedValue(mocks.downloadFileToProcess);
  s3.deleteObject = jest.fn()
    .mockResolvedValue({});
  s3Service.uploadFileToProcess = jest.fn()
    .mockResolvedValue({});
  s3Service.deleteFileById = jest.fn()
    .mockResolvedValue({});
  s3Service.uploadFileToProcess = jest.fn()
    .mockResolvedValue({});
  s3Service.listAllToProcess = jest.fn()
    .mockResolvedValue(mocks.listAllFileNames);
  s3Service.downloadFileToProcess = jest.fn()
    .mockResolvedValue(mocks.downloadFileToProcess);
  s3Service.deleteFileById = jest.fn()
    .mockResolvedValue(mocks.deleteFileToProcess);
  s3Service.deleteFiles = jest.fn()
    .mockResolvedValue({});

  Product.create = jest.fn().mockResolvedValue({});
  Product.findOneAndUpdate = jest.fn().mockResolvedValue({});
  Product.find = jest.fn().mockResolvedValue(mocks.productFindAll);
  Product.findByIdAndRemove = jest.fn().mockResolvedValue({});
  Calculation.find = jest.fn().mockResolvedValue(mocks.listAllCalculation);
  Calculation.deleteMany = jest.fn().mockResolvedValue({});
};

const initMockException = () => {
  fs.writeFile = jest.fn()
    .mockRejectedValue(new Error());
  fs.readFile = jest.fn()
    .mockRejectedValue(new Error());
  s3.upload = jest.fn()
    .mockRejectedValue(new Error());
  s3.listObjects = jest.fn()
    .mockRejectedValue(new Error());
  s3.getObject = jest.fn()
    .mockRejectedValue(new Error());
  s3.deleteObject = jest.fn()
    .mockRejectedValue(new Error());
  s3Service.listAllToProcess = jest.fn()
    .mockResolvedValue(new Error());
  s3Service.uploadFileToProcess = jest.fn()
    .mockRejectedValue(new Error());
  s3Service.listAllToProcess = jest.fn()
    .mockRejectedValue(new Error());
  s3Service.downloadFileToProcess = jest.fn()
    .mockRejectedValue(new Error());
  s3Service.deleteFileById = jest.fn()
    .mockRejectedValue(new Error());
  s3Service.deleteFiles = jest.fn()
    .mockRejectedValue(new Error());

  Product.create = jest.fn().mockRejectedValue(new Error());
  Product.findOneAndUpdate = jest.fn().mockRejectedValue(new Error());
  Product.find = jest.fn().mockRejectedValue(new Error());
  Product.findByIdAndRemove = jest.fn().mockRejectedValue(new Error());
  Calculation.find = jest.fn().mockRejectedValue(new Error());
  Calculation.deleteMany = jest.fn().mockRejectedValue(new Error());
  Calculation.save = jest.fn().mockResolvedValue(new Error());
};

