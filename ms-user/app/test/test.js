require("dotenv").config();
const accountService = require("../src/components/account/account.service");
const awsService = require("../src/components/amazon/amazonS3.service");
const mocks = require("./mocks/mocks");
const Account = require("../src/components/account/account.model");

jest.useFakeTimers();

beforeAll(() => initMocks());

describe("user tests success", () => {
  beforeAll(() => {
    awsService.downloadUserPhotoByFileName = jest.fn()
      .mockResolvedValue(mocks.downloadFoto);
    Account.findOne = jest.fn()
      .mockResolvedValue(mocks.getAccountSuccess);
    Account.create = jest.fn()
      .mockResolvedValue({});
    Account.findOneAndUpdate = jest.fn()
      .mockResolvedValue(null);
  });

  it("should be defined photo", async () => {
    return await accountService.getAccount("user", "common")
      .then((value) => expect(value).toBeDefined());
  });

  it("should return account", async () => {
    return await accountService.getAccount("user", "common")
      .then((value) => expect(value).toEqual(mocks.getAccountSuccess));
  });

  it("should create account", async () => {
    return await accountService.saveAccount(mocks.saveAccountSuccess)
      .then((value) => expect(value).toEqual("Account created!"));
  });

  describe("user tests get account with photo", () => {
    beforeAll(() => {
      awsService.downloadUserPhotoByFileName = jest.fn()
        .mockResolvedValue(mocks.downloadFoto);
      Account.findOne = jest.fn()
        .mockResolvedValue(mocks.getAccountSuccess);
    });

    it("should get one account with photo defined", async () => {
      return await accountService.getAccount("user", "common")
        .then((value) => {
          value.photoBase64 = mocks.downloadFoto.Body.toString("base64");
          expect(value.photoBase64).toEqual(mocks.getAccountSuccess.photoBase64);
        });
    });
  });


  describe("user tests update account", () => {
    beforeAll(() => {
      Account.findOneAndUpdate = jest.fn()
        .mockResolvedValue({});
    });

    it("should update one account", async () => {
      return await accountService.saveAccount(mocks.saveAccountSuccess)
        .then((value) => expect(value).toEqual("Account updated!"));
    });
  });


  describe("user tests not found", () => {
    beforeAll(() => {
      Account.findOne = jest.fn()
        .mockResolvedValue(null);
    });

    it("should not found one account", async () => {
      return await accountService.getAccount("user", "common")
        .then((value) => expect(value).toEqual("Account user not found!"));
    });
  });
});

describe("user tests exception", () => {
  beforeAll(() => {
    Account.findOne = jest.fn()
      .mockRejectedValue(new Error());
    Account.create = jest.fn()
      .mockRejectedValue(new Error());
  });

  it("should get error to find account", async () => {
    return await accountService.getAccount("user", "common")
      .catch((reason) => expect(reason.message).toEqual("Error to get account"));
  });

  describe("user tests exception to create account undefined required fields", () => {
    beforeAll(() => {
      Account.findOne = jest.fn()
        .mockResolvedValue(mocks.getAccountSuccess);
      Account.create = jest.fn()
        .mockResolvedValue({});
      Account.findOneAndUpdate = jest.fn()
        .mockResolvedValue(null);
    });

    it("should not create one account user undefined", async () => {
      return await accountService.saveAccount(mocks.saveAccountUserNameNull)
        .catch((reason) => expect(reason.message).toEqual("Username is a required field!"));
    });

    it("should not create one account client undefined", async () => {
      return await accountService.saveAccount(mocks.saveAccountClientNull)
        .catch((reason) => expect(reason.message).toEqual("Client is a required field!"));
    });

    it("should not create one account First Name undefined", async () => {
      return await accountService.saveAccount(mocks.saveAccountFirstNameNull)
        .catch((reason) => expect(reason.message).toEqual("First Name is a required field!"));
    });

    it("should not create one account Last Name undefined", async () => {
      return await accountService.saveAccount(mocks.saveAccountLastNameNull)
        .catch((reason) => expect(reason.message).toEqual("Last Name is a required field!"));
    });

    it("should not create one account Email undefined", async () => {
      return await accountService.saveAccount(mocks.saveAccountEmailNull)
        .catch((reason) => expect(reason.message).toEqual("Email is a required field!"));
    });
  });

  describe("user tests exception not download photo", () => {
    beforeAll(() => {
      awsService.downloadUserPhotoByFileName = jest.fn()
        .mockRejectedValue(new Error());
      Account.findOne = jest.fn()
        .mockResolvedValue(mocks.getAccountSuccess);
    });

    it("should not download photo from aws", async () => {
      return await accountService.getAccount("user", "common")
        .catch((reason) => expect(reason.message).toBeDefined());
    });
  });


  describe("user tests exception to create account", () => {
    beforeAll(() => {
      Account.findOneAndUpdate = jest.fn()
        .mockResolvedValue(null);
      Account.create = jest.fn()
        .mockRejectedValue(new Error());
    });

    it("should not create one account", async () => {
      return await accountService.saveAccount(mocks.saveAccountSuccess)
        .catch((reason) => expect(reason.message).toEqual("Error to save account!"));
    });
  });


  describe("user tests exception to update", () => {
    beforeAll(() => {
      Account.findOneAndUpdate = jest.fn()
        .mockRejectedValue(new Error());
    });

    it("should not update one account", async () => {
      return await accountService.saveAccount(mocks.saveAccountSuccess)
        .catch((reason) => expect(reason.message).toEqual("Error to save account!"));
    });
  });
});

const initMocks = () => {
  jest.mock("./mocks/mocks");
  jest.mock("../src/components/account/account.model");
  jest.mock("../src/components/account/account.service");
  jest.mock("../src/components/amazon/amazonS3.service");
};
