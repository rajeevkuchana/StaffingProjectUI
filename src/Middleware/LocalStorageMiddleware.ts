// src/middleware/localStorageMiddleware.js
const localStorageMiddleware = store => next => action => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem('auth',state.auth);
    return result;
  };
  
  export default localStorageMiddleware;
  