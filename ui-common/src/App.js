import React from "react";
import {ReactKeycloakProvider} from "@react-keycloak/web"
import {keycloak, keyCloakInitConfig} from "./utils/auth";
import Routes from "./Routes";

function App() {
  return (
      <ReactKeycloakProvider authClient={keycloak} initOptions={keyCloakInitConfig}>
          <Routes />
      </ReactKeycloakProvider>
  );
}

export default App;
