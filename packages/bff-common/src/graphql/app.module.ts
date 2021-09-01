import {GraphQLModule} from '@graphql-modules/core';
import {tariffModule} from "./tariff/tariff.module";
import {userModule} from "./user/user.module";

export const appModule = new GraphQLModule({
    imports: [
        tariffModule, userModule
    ]
});

export default appModule.schema;
