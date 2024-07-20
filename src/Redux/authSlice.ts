import { createSlice } from '@reduxjs/toolkit';

// Helper function to get the initial state from local storage
const getInitialState = () => {
  const user = localStorage.getItem('user');
  return user ? {user : JSON.parse(user)} : { user: null };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
