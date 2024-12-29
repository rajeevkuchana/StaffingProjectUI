import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiBaseAddress } from '../Utils/Const';
import axios from 'axios';
import { ISignUpDetails } from '../Types/AuthType';

// Define a type for the slice state
interface UserState {
  users: Array<any>;
  user: any,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  deleteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  createStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Helper function to get the initial state from local storage
const initialState: UserState = {
  user: {} as any,
  users: [],
  status: 'idle',
  error: null,
  deleteStatus: 'idle',
  createStatus: 'idle'
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<[]>(`${apiBaseAddress}/users`);
  return response.data;
});

export const createUsers = createAsyncThunk('users/addUser', async (user: any) => {
  const response = await axios.post<[]>(`${apiBaseAddress}/user/add`, user);
  const data = {
    "attributes": {
      "locale": "",
      "company": user.company
    },
    "requiredActions": [],
    "emailVerified": false,
    "username": user.username,
    "email": user.email,
    "groups": [],
    "enabled": true,
    "credentials": [
      {
        "type": "password",
        "value": user.password,
        "temporary": false
      }
    ]
  }

  const _headers = {
    'Content-Type': 'application/json',
    "authorization": `Bearer ${localStorage.getItem("keycloak-token")}`
  }
  const _response = await axios.post(`https://portal.quantlytixsolutions.com/auth/admin/realms/quantlytix/users`, data, {
    headers: _headers
  });
  console.log(_response.headers);
  const userId = _response.headers.location.split("/")[_response.headers.location.split("/").length - 1]
  const roles = await axios.get(`https://portal.quantlytixsolutions.com/auth/admin/realms/quantlytix/roles?first=0&max=21`, {
    headers: _headers
  })
  const roleId = roles.data.find(x => x.name === user.role)
  const roleData = [
    {
      "id": roleId.id,
      "name": user.role,
      "description": "",
      "composite": false,
      "clientRole": false
      // "containerId": "6413762d-9d7f-4b17-9f33-e89d7295e912"
    }
  ]
  const _role = await axios.post(`https://portal.quantlytixsolutions.com/auth/admin/realms/quantlytix/users/${userId}/role-mappings/realm`, roleData, {
    headers: _headers
  });
});

export const deleteUsers = createAsyncThunk('users/deleteUsers', async (id: any) => {
  const response = await axios.delete<[]>(`${apiBaseAddress}/user/delete/${id}`);
  return response.data;
});

export const keyclockAddUser = createAsyncThunk('users/keyclockAddUser', async (user: ISignUpDetails) => {

  try {

    // return response.data
  } catch (err) {
    return err
  }
});


const userSlice = createSlice({
  name: 'client',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state: UserState) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state: UserState, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state: UserState, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(deleteUsers.pending, (state: UserState, action) => {
        state.deleteStatus = 'idle';
      })
      .addCase(deleteUsers.fulfilled, (state: UserState, action) => {
        state.deleteStatus = 'succeeded';
      })
      .addCase(createUsers.pending, (state: UserState, action) => {
        state.createStatus = 'idle';
      })
      .addCase(createUsers.fulfilled, (state: UserState, action) => {
        state.createStatus = 'succeeded';
      })

  },
});

export default userSlice.reducer;
