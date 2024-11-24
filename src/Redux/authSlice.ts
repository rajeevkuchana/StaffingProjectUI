import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiBaseAddress } from '../Utils/Const';

// Helper function to get the initial state from local storage
const getInitialState = () => {
  const user = localStorage.getItem('keycloak-user');
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getInitialState(),
    loginStatus: 'idle'

  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('keycloak-user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('keycloak-user');
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(verifyUser.fulfilled, (state: any, action : any) => {
        if(action.payload?.role){
          state.loginStatus = 'succeeded';
          state.user = action.payload
          localStorage.setItem('keycloak-user', JSON.stringify(state.user));
        }
        else{
          state.loginStatus = 'failed';
        }
      })
      .addCase(verifyUser.pending, (state: any, action) => {
        state.loginStatus = 'idle';
      })
      .addCase(verifyUser.rejected, (state: any, action) => {
        state.loginStatus = 'failed';
      })
  },
});

export const verifyUser = createAsyncThunk('users/varifyUser', async (user: any) => {
  const response = await axios.post<[]>(`${apiBaseAddress}/user/verify`, user);
  return response.data;
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
