import {GraphQLModule} from "@graphql-modules/core";
import typeDefs from './tariff.graphql'
import resolvers from './tariff.resolver'
import TariffDatasource from "./tariff.datasource";

export const tariffModule = new GraphQLModule({
    typeDefs, resolvers,
    imports: [
    ],
    providers: [
        TariffDatasource
    ]
})