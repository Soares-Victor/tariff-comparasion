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
        return await this.post('/products', JSON.stringify(productModel))
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body.name || reason.extensions.response.body);
            });
    }

    async listAllProducts(): Promise<any> {
        return await this.get('/products')
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body.name || reason.extensions.response.body);
            });
    }

    async updateProduct(id, productModel): Promise<any> {
        return await this.put(`/products/${id}`, JSON.stringify(productModel))
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body.name || reason.extensions.response.body);
            });
    }

    async deleteProduct(id): Promise<any> {
        return await this.delete(`/products/${id}`)
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body.name || reason.extensions.response.body);
            });
    }

    async calculateCostsYear(kwhYear): Promise<any> {
        return await this.get(`/calculations/kwhyear/${kwhYear}`)
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body.name || reason.extensions.response.body);
            });
    }

    async deleteCalcs(ids): Promise<any> {
        return await this.delete('/calculations', {}, {body: ids})
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body.name || reason.extensions.response.body);
            });
    }

    async listAllCalculation(): Promise<any> {
        return await this.get('/calculations')
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body.name || reason.extensions.response.body);
            });
    }

    async uploadFileConsumption(fileModel): Promise<any> {
        return await this.post('/files', JSON.stringify(fileModel))
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body.name || reason.extensions.response.body);
            });
    }

    async startProcess(): Promise<any> {
        return await this.post('/files/process/starts')
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body.name || reason.extensions.response.body);
            });
    }

    async listAllFilesProcess(): Promise<any> {
        return await this.get('/files')
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body.name || reason.extensions.response.body);
            });
    }

    async deleteFilesProcess(files): Promise<any> {
        return await this.delete('/files', {}, {body: files})
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body.name || reason.extensions.response.body);
            });
    }

}