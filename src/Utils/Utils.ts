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

export const getUseEmail = ()=>{
    if(localStorage.user){
        return JSON.parse(localStorage.user).email
    }
    return false;
}

export const clearLocalStorage = ()=>{
    localStorage.clear();
}