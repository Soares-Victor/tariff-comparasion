import {Injectable, ProviderScope} from "@graphql-modules/di";
import {RESTDataSource} from "apollo-datasource-rest";
import process from "process";
import {TOKEN_HEADER} from "../../index";
import log from "../../logger/log";

@Injectable({
    scope: ProviderScope.Session
})
export default class UserDatasource extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = process.env.URL_API_GATEWAY
    }

    protected willSendRequest(request) {
        request.headers.set("Authorization", TOKEN_HEADER)
        request.headers.set("Content-Type", "application/json")
    }

    async saveUserAccount(accountModel): Promise<any> {
        return await this.post('/accounts', JSON.stringify(accountModel))
            .then(value => {
                log.info(value);
                return value;
            })
            .catch(reason => {
                log.error(reason.extensions.response.body, reason);
                throw new Error(reason.extensions.response.body.name || reason.extensions.response.body);
            });
    }

    async getLoggedUser(user, client): Promise<any> {
        return await this.get(`/accounts/client/${client}/id/${user}`)
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