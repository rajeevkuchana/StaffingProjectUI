export const isUserLogin = () => {

    if (localStorage.user) {
        return JSON.parse(localStorage.user).id ? true : false;
    }
    return false;
}

export const getUserRole = () => {
    if (localStorage.user) {
        return JSON.parse(localStorage.user).role
    }
    return false;
}

export const getUseEmail = () => {
    if (localStorage.user) {
        return JSON.parse(localStorage.user).email
    }
    return false;
}

export const clearLocalStorage = () => {
    localStorage.clear();
}

export const uuidv4 = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}