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

beforeAll(() => initMock());

describe("service costs", () => {
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
      .then((value) => expect(value).toBeDefined());
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

describe("service products", () => {
  it("should create new product", async () => {
    return await productsService.createProduct(mocks.createNewProduct)
      .then((value) => expect(value).toBeDefined());
  });

  it("should list all products", async () => {
    return await productsService.findAllProduct()
      .then((value) => expect(value).toEqual(mocks.productFindAll));
  });

  it("should delete one product", async () => {
    return await productsService.deleteById(1)
      .then((value) => expect(value).toBeDefined());
  });

  it("should update a product", async () => {
    return await productsService.update(1, mocks.createNewProduct)
      .then((value) => expect(value).toBeDefined());
  });
});

const initMock = () => {
  jest.mock("../src/components/amazon/amazonS3.service");
  jest.mock("fs");
  jest.mock("aws-sdk");
  jest.mock("../src/components/costs/costs.service");
  jest.mock("../src/components/amazon/amazonS3.service");
  jest.mock("../src/components/products/product.service");
  jest.mock("../src/components/amazon/amazonS3.service");

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
