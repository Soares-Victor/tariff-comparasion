import {Injectable, ProviderScope} from "@graphql-modules/di";
import {RESTDataSource} from "apollo-datasource-rest";
import process from "process";
import {TOKEN_HEADER} from "../../index";

@Injectable({
    scope: ProviderScope.Session
})
export default class TariffDatasource extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = process.env.URL_API_GATEWAY
    }

    protected willSendRequest(request) {
        request.headers.set("Authorization", TOKEN_HEADER)
        request.headers.set("Content-Type", "application/json")
    }

    async createProductData (productModel): Promise<any> {
        return await this.post('/product/create', JSON.stringify(productModel))
            .then(value => value)
            .catch(reason => {throw reason});
    }

    async listAllProducts(): Promise<any> {
        return await this.get('/product/listall')
            .then(value => value)
            .catch(reason => {throw reason});
    }

    async updateProduct(id, productModel): Promise<any> {
        return await this.put(`/product/update/id/${id}`, JSON.stringify(productModel))
            .then(value => value)
            .catch(reason => {throw reason});
    }

    async deleteProduct(id): Promise<any> {
        return await this.delete(`/product/delete/id/${id}`)
            .then(value => value)
            .catch(reason => {throw reason});
    }

    async calculateCostsYear(kwhyear): Promise<any> {
        return await this.post('/costs/calculate', JSON.stringify(kwhyear))
            .then(value => value)
            .catch(reason => {throw reason});
    }

    async uploadFileConsumption(fileModel): Promise<any> {
        return await this.post('/costs/upload', JSON.stringify(fileModel))
            .then(value => value)
            .catch(reason => {throw reason});
    }

    async listAllCalculation(): Promise<any> {
        return await this.get('/costs/calculation/listall')
            .then(value => value)
            .catch(reason => {throw reason});
    }

    async startProcess(): Promise<any> {
        return await this.get('/costs/process/start')
            .then(value => value)
            .catch(reason => {throw reason});
    }

    async listAllFilesProcess(): Promise<any> {
        return await this.get('/costs/file/toprocess/listall')
            .then(value => value)
            .catch(reason => {throw reason});
    }

    async deleteFilesProcess(files): Promise<any> {
        return await this.delete('/costs/file/toprocess/delete', {}, {body: files})
            .then(value => value)
            .catch(reason => {throw reason});
    }

    async deleteCalcs(ids): Promise<any> {
        return await this.delete('/costs/delete', {}, {body: ids})
            .then(value => value)
            .catch(reason => {throw reason});
    }

}