import {GraphQLModule} from '@graphql-modules/core';
import {tariffModule} from "./tariff/tariff.module";

export const appModule = new GraphQLModule({
    imports: [
        tariffModule
    ]
});

export default appModule.schema;
