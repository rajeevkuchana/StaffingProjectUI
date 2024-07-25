import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiBaseAddress } from '../Utils/Const';
import axios from 'axios';
import { IProfile } from '../Types/ProfileType';

// Define a type for the slice state
interface ProfileState {
  searchProfiles: Array<any>;
  searchProfile: any,
  selectedProfiles: Array<any>;
  selectedProfile: any,
  searchProfileStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  searchProfilesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedProfileStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Helper function to get the initial state from local storage
const initialState: ProfileState = {
  searchProfile: {} as any,
  searchProfiles: [],
  selectedProfile: {} as any,
  selectedProfiles: [],
  searchProfileStatus: 'idle',
  searchProfilesStatus: 'idle',
  selectedProfileStatus: 'idle',
  error: null
};

// Async thunk for fetching users
export const fetchSearchProfile = createAsyncThunk('profile/fetchSearchProfile', async () => {
  const response = await axios.get<[]>(`${apiBaseAddress}/profiles`);
  return response.data;
});

export const fetchSearchProfileById = createAsyncThunk('profile/fetchSearchProfileById', async (id: string) => {
  const response = await axios.get<[]>(`${apiBaseAddress}/profiles/${id}`);
  return response.data;
});

export const fetchSelectedProfile = createAsyncThunk('profile/fetchSelectedProfile', async () => {
  const response = await axios.get<[]>(`${apiBaseAddress}/profiles`);
  return response.data;
});

export const fetchSelectedProfileById = createAsyncThunk('profile/fetchSelectedProfileById', async (id: string) => {
  const response = await axios.get<[]>(`${apiBaseAddress}/profiles/${id}`);
  return response.data;
});

export const createProfileInterview = createAsyncThunk('profile/createProfileInterview', async (data: IProfile) => {
  const response = await axios.post<[]>(`${apiBaseAddress}/profiles/add`,data);
  return response.data;
});

const userSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchProfile.pending, (state: ProfileState) => {
        state.searchProfilesStatus = 'loading';
      })
      .addCase(fetchSearchProfile.fulfilled, (state: ProfileState, action: PayloadAction<any[]>) => {
        state.searchProfilesStatus = 'succeeded';
        state.searchProfiles = action.payload;
      })
      .addCase(fetchSearchProfile.rejected, (state: ProfileState, action) => {
        state.searchProfilesStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(fetchSearchProfileById.pending, (state: ProfileState) => {
        state.searchProfileStatus = 'loading';
      })
      .addCase(fetchSearchProfileById.fulfilled, (state: ProfileState, action: PayloadAction<any[]>) => {
        state.searchProfileStatus = 'succeeded';
        state.searchProfile = action.payload;
      })
      .addCase(fetchSearchProfileById.rejected, (state: ProfileState, action) => {
        state.searchProfileStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(fetchSelectedProfile.pending, (state: ProfileState) => {
        state.selectedProfileStatus = 'loading';
      })
      .addCase(fetchSelectedProfile.fulfilled, (state: ProfileState, action: PayloadAction<any[]>) => {
        state.selectedProfileStatus = 'succeeded';
        state.selectedProfiles = action.payload;
      })
      .addCase(fetchSelectedProfile.rejected, (state: ProfileState, action) => {
        state.selectedProfileStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      })
  },
});

export default userSlice.reducer;
