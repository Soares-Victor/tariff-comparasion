import gql from "graphql-tag";

export const QUERY_LIST_ALL_FILES_TO_PROCESS = gql`
    {
        query: listAllFilesToProcess
    }
`;

export const QUERY_LIST_ALL_PRODUCT = gql`
    {
        query: listAllProduct {
            _id, tariffName, description, month, values {
                baseCost, kwhCost, maxConsumption
            }
        }
    }
`;

export const QUERY_LIST_ALL_CALCULATION = gql`
    {
        query: listAllCalculationCost {
            _id, dateProcessed, installNumber, person {firstName, lastName},totalCosts{
                kwhYear, products{
                    name, description, charger, totalYear {
                        baseCostsYear, kwhCostsYear, totalCosts
                    }
                }
            }
        }
    }
`;

export const QUERY_START_PROCESSING = gql`
    {
        query: startProcessing
    }
`;

export const MUTATION_CREATE_PRODUCT = gql`
    mutation ($productModel: ProductInput) {
        createOneProduct(productModel: $productModel)
    }
`;

export const MUTATION_UPDATE_PRODUCT = gql`
    mutation ($id: String, $productModel: ProductInput) {
        updateOneProduct(id: $id, productModel: $productModel)
    }
`;

export const MUTATION_DELETE_PRODUCT = gql`
    mutation ($id: String) {
        deleteOneProduct(id: $id)
    }
`;

export const MUTATION_DELETE_FILE_TO_PROCESS = gql`
    mutation ($ids: [String]) {
        deleteFilesToProcess(ids: $ids)
    }
`;

export const MUTATION_DELETE_CALCULATIONS = gql`
    mutation ($ids: [String]) {
        deleteCalculations(ids: $ids)
    }
`;

export const MUTATION_CALCULATE_COSTS_YEAR = gql`
    mutation ($calculateModel: CalculateInput) {
        calculateCostYear(calculateModel: $calculateModel)
        {kwhYear, products{
            name, description, charger, totalYear {
                baseCostsYear, kwhCostsYear, totalCosts
            }
        }
        }
    }
`;

export const MUTATION_UPLOAD_FILE = gql`
    mutation ($fileProcessModel: [FileProcessInput]) {
        uploadFileToProcess(fileProcessModel: $fileProcessModel)
    }
`;
