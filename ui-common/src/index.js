import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
import Keycloak from "keycloak-js";
import {setContext} from "@apollo/client/link/context";
import Routes from "./Routes";


const httpLink = createUploadLink({
    uri: process.env.REACT_APP_BFF_URL
});

function connectBff() {
    const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem('token') || '';
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
            }
        }
    });
    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });
}

const initKeycloak = {
    url: process.env.REACT_APP_KEYCLOAK_URL,
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENTID,
    onLoad: process.env.REACT_APP_KEYCLOAK_ONLOAD
};

let keycloak = Keycloak(initKeycloak);

keycloak.init({ onLoad: initKeycloak.onLoad }).then((auth)=> {
    let clientApollo;
    if (!auth) {
        window.location.reload();
    } else {
        localStorage.setItem('token', keycloak.token);
        clientApollo = connectBff();
    }
    ReactDOM.render(
        <React.StrictMode>
            <ApolloProvider client={clientApollo}>
                <Routes />
            </ApolloProvider>
        </React.StrictMode>,
        document.getElementById('root')
    );
    setTimeout(() => {
        keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).catch(() => {
            console.error('Failed to refresh token');
        });
    }, 60000)
});
reportWebVitals();
