import TariffDatasource from "./tariff.datasource";

export default {
    Query: {
        listAllProduct: async(root, args, { injector }) => {
            return await injector.get(TariffDatasource).listAllProducts();
        },
        listAllCalculationCost: async(root, args, { injector }) => {
            return await injector.get(TariffDatasource).listAllCalculation();
        },
        startProcessing: async(root, args, { injector }) => {
            return await injector.get(TariffDatasource).startProcess();
        },
        listAllFilesToProcess: async(root, args, { injector }) => {
            return await injector.get(TariffDatasource).listAllFilesProcess();
        },
    },
    Mutation: {
        createOneProduct: async(root, args, { injector }) => {
            return await injector.get(TariffDatasource).createProductData(args.productModel);
        },
        updateOneProduct: async(root, args, { injector }) => {
            return await injector.get(TariffDatasource).updateProduct(args.id, args.productModel);
        },
        deleteOneProduct: async(root, args, { injector }) => {
            return await injector.get(TariffDatasource).deleteProduct(args.id);
        },
        calculateCostYear: async(root, args, { injector }) => {
            return await injector.get(TariffDatasource).calculateCostsYear(args.calculateModel);
        },
        uploadFileToProcess: async(root, args, { injector }) => {
            return await injector.get(TariffDatasource).uploadFileConsumption(args.fileProcessModel);
        },
        deleteFilesToProcess: async(root, args, { injector }) => {
            return await injector.get(TariffDatasource).deleteFilesProcess(args.ids);
        },
        deleteCalculations: async(root, args, { injector }) => {
            return await injector.get(TariffDatasource).deleteCalcs(args.ids);
        },
    }
}