import jwt_decode from "jwt-decode";
import { userRole } from "./Const";

export const isUserLogin = () => {

    if (localStorage.getItem("keycloak-user-info")) {
        return JSON.parse(localStorage.user).sid ? true : false;
    }
    return false;
}

export const getUserRole = () => {
    // if (localStorage.getItem("keycloak-token")) {
    //     const token = parseJwt(localStorage.getItem("keycloak-token"))
    //     const roles = token.realm_access?.roles || [];
    //     if (roles.includes(userRole.admin)) return userRole.admin
    //     if (roles.includes(userRole.client)) return userRole.client
    //     if (roles.includes(userRole.interviwer)) return userRole.interviwer
    //     if (roles.includes(userRole.recruiter)) return userRole.recruiter
    // }
    if (localStorage.getItem("keycloak-user")) {
        return JSON.parse(localStorage["keycloak-user"]).role 
    }
}

export const getUserEmail = () => {
    if (localStorage.getItem("keycloak-user-info")) {
        const user = JSON.parse(localStorage.getItem("keycloak-user-info") || '')
        return user.email
    }
    return false;
}


export const getJobType = () => {
    if (localStorage.jobType) {
        return localStorage.jobType
    }
    return "profiles";
}

export const clearLocalStorage = () => {
    localStorage.clear();
}

export const uuidv4 = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

export const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};