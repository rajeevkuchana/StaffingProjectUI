import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiBaseAddress } from '../Utils/Const';
import axios from 'axios';



// Define a type for the slice state
interface UserState {
  clients: Array<any>;
  client: any,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Helper function to get the initial state from local storage
const initialState: UserState = {
  client: {} as any,
  clients: [],
  status: 'idle',
  error: null
};

// Async thunk for fetching users
export const fetchClients = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<[]>(`${apiBaseAddress}/client`);
  return response.data;
});

const clientSlice = createSlice({
  name: 'client',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state: UserState) => {
        state.status = 'loading';
      })
      .addCase(fetchClients.fulfilled, (state: UserState, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state: UserState, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch clients';
      });
  },
});

export default clientSlice.reducer;
