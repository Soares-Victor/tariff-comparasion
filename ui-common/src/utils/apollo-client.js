import {ApolloClient, InMemoryCache} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
import {setContext} from "@apollo/client/link/context";
import React from "react";


const httpLink = createUploadLink({
    uri: process.env.REACT_APP_BFF_URL
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token') || '';
    console.log(token)
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        }
    }
});

const clientApollo = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default clientApollo;