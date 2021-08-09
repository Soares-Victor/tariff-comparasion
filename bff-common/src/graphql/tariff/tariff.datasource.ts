import {Injectable, ProviderScope} from "@graphql-modules/di";
import {RESTDataSource} from "apollo-datasource-rest";
import process from "process";
import {TOKEN_HEADER} from "../../index";
import log from "../../logger/log";

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
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body);
            });
    }

    async listAllProducts(): Promise<any> {
        return await this.get('/product/listall')
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body);
            });
    }

    async updateProduct(id, productModel): Promise<any> {
        return await this.put(`/product/update/id/${id}`, JSON.stringify(productModel))
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body);
            });
    }

    async deleteProduct(id): Promise<any> {
        return await this.delete(`/product/delete/id/${id}`)
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body);
            });
    }

    async calculateCostsYear(kwhyear): Promise<any> {
        return await this.post('/costs/calculate', JSON.stringify(kwhyear))
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body);
            });
    }

    async uploadFileConsumption(fileModel): Promise<any> {
        return await this.post('/costs/upload', JSON.stringify(fileModel))
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body);
            });
    }

    async listAllCalculation(): Promise<any> {
        return await this.get('/costs/calculation/listall')
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body);
            });
    }

    async startProcess(): Promise<any> {
        return await this.get('/costs/process/start')
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body);
            });
    }

    async listAllFilesProcess(): Promise<any> {
        return await this.get('/costs/file/toprocess/listall')
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body);
            });
    }

    async deleteFilesProcess(files): Promise<any> {
        return await this.delete('/costs/file/toprocess/delete', {}, {body: files})
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body);
            });
    }

    async deleteCalcs(ids): Promise<any> {
        return await this.delete('/costs/delete', {}, {body: ids})
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body);
            });
    }

}