import UserDatasource from "./user.datasource";

export default {
    Query: {
        getLoggedAccount: async (root, args, { injector }) => {
            return await injector.get(UserDatasource).getLoggedUser(args.user, args.client);
        }
    },
    Mutation: {
        saveAccount: async (root, args, { injector }) => {
            return await injector.get(UserDatasource).saveUserAccount(args.accountModel);
        }
    }
}
