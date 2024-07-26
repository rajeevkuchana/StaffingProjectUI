import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiBaseAddress } from '../Utils/Const';
import axios from 'axios';

// Define a type for the slice state
interface UserState {
  users: Array<any>;
  user: any,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  deleteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  createStatus : 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Helper function to get the initial state from local storage
const initialState: UserState = {
  user: {} as any,
  users: [],
  status: 'idle',
  error: null,
  deleteStatus : 'idle',
  createStatus : 'idle'
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<[]>(`${apiBaseAddress}/users`);
  return response.data;
});

export const createUsers = createAsyncThunk('users/addUser', async (user:any) => {
  const response = await axios.post<[]>(`${apiBaseAddress}/user/add`,user);
  return response.data;
});

export const deleteUsers = createAsyncThunk('users/deleteUsers', async (id:any) => {
  const response = await axios.delete<[]>(`${apiBaseAddress}/user/delete/${id}`);
  return response.data;
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
      });
  },
});

export default userSlice.reducer;
