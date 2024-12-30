import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiBaseAddress } from '../Utils/Const';
import qs from 'qs';
import { parseJwt } from '../Utils/Utils';
// Helper function to get the initial state from local storage
const getInitialState = () => {
  const user = localStorage.getItem('keycloak-user-info');
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getInitialState(),
    varifyUser: {} as any,
    loginStatus: 'idle',
    loginStatusKeyclock: 'idle'

  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('keycloak-user-info', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('keycloak-user-info');
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(verifyUser.fulfilled, (state: any, action: any) => {
        if (action.payload?.role) {
          state.loginStatus = 'succeeded';
          state.varifyUser = action.payload;
          state.user = parseJwt( localStorage.getItem('keycloak-token'));
          localStorage.setItem('varify-user', JSON.stringify(state.user));
        }
        else {
          state.loginStatus = 'failed';
        }
      })
      .addCase(verifyUser.pending, (state: any, action) => {
        state.loginStatus = 'idle';
      })
      .addCase(verifyUser.rejected, (state: any, action) => {
        state.loginStatus = 'failed';
      })
      .addCase(keyclockAPILogin.fulfilled, (state: any, action: any) => {
        if (action.payload?.access_token) {
          state.loginStatusKeyclock = 'succeeded';
          state.user = parseJwt(action.payload?.access_token);
          // Store the token and user info in localStorage
          localStorage.setItem('keycloak-token', action.payload?.access_token);
          localStorage.setItem('keycloak-sso-login', 'false');

          localStorage.setItem('keycloak-user-info', JSON.stringify(parseJwt(action.payload?.access_token)));
          window.location.href = window.location.origin + "/home"
        }
        else {
          state.loginStatusKeyclock = 'failed';
        }
      })
  },
});

export const verifyUser = createAsyncThunk('users/varifyUser', async (user: any) => {
  const response = await axios.post<[]>(`${apiBaseAddress}/user/verify`, user);
  return response.data;
});


export const keyclockAPILogin = createAsyncThunk('users/keyclockAPILogin', async (user: any) => {
  const data = qs.stringify({
    'grant_type': 'password',
    'client_id': 'QuantlytixUI',
    'username': user.email,
    'scope': 'openid',
    'password': user.password
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://portal.quantlytixsolutions.com/auth/realms/quantlytix/protocol/openid-connect/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'Path=/; Path=/',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data
  } catch (err) {
    return err
  }
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
