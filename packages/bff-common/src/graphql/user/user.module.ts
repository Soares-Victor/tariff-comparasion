import {GraphQLModule} from "@graphql-modules/core";
import typeDefs from './user.graphql';
import resolvers from './user.resolver';
import UserDatasource from "./user.datasource";

export const userModule = new GraphQLModule({
    typeDefs, resolvers,
    imports: [

    ],
    providers: [
        UserDatasource
    ]
})