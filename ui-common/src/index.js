import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
import Keycloak from "keycloak-js";
import {setContext} from "@apollo/client/link/context";


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
        localStorage.setItem('realm', keycloak.realm);
        keycloak.loadUserInfo().then(value => {
            localStorage.setItem('user', value["preferred_username"]);
        });
        clientApollo = connectBff();
    }

    ReactDOM.render(
        <ThemeContextWrapper>
            <BackgroundColorWrapper>
                <ApolloProvider client={clientApollo}>
                    <BrowserRouter>
                        <Switch>
                            <Route path={process.env.PUBLIC_URL} render={(props) => <AdminLayout {...props} />} />
                            <Redirect from="/" to={`${process.env.PUBLIC_URL}/dashboard`} />
                        </Switch>
                    </BrowserRouter>
                </ApolloProvider>
            </BackgroundColorWrapper>
        </ThemeContextWrapper>,
        document.getElementById("root")
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
    }, 20000)
});