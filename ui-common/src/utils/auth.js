import React from "react";

const Keycloak = require("keycloak-js")

export const keycloak = Keycloak({
    url: process.env.REACT_APP_KEYCLOAK_URL,
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENTID
})

export const keyCloakInitConfig = Keycloak.KeycloakInitOptions = {
    onLoad: process.env.REACT_APP_KEYCLOAK_ONLOAD
}
