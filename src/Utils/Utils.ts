export const isUserLogin = ()=>{
    
    if(localStorage.user){
        return JSON.parse(localStorage.user).id    ? true : false;
    }
    return false;
}

export const getUserRole = ()=>{
    if(localStorage.user){
        return JSON.parse(localStorage.user).role
    }
    return false;
}

export const clearLocalStorage = ()=>{
    localStorage.clear();
}