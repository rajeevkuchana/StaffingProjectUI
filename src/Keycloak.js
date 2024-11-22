import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "https://portal.quantlytixsolutions.com/auth",
    realm: "quantlytix",
    clientId: "QuantlytixUI",
   
});
export default keycloak;
