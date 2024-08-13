import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiBaseAddress } from '../Utils/Const';
import axios from 'axios';
import { IProfile } from '../Types/ProfileType';
import { getUseEmail } from '../Utils/Utils';

// Define a type for the slice state
interface ProfileState {
  searchProfiles: Array<any>;
  searchProfile: IProfile,
  selectedProfiles: Array<any>;
  selectedProfile: any,
  searchProfilesJobDesc: any
  searchProfileStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  searchProfilesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedProfileStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  createProfileStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  jobCategory: Array<any>;
  jobCategoryStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  searchProfilesJobDescStatus: 'idle' | 'loading' | 'succeeded' | 'failed';

}

// Helper function to get the initial state from local storage
const initialState: ProfileState = {
  searchProfile: {} as IProfile,
  searchProfilesJobDesc: '',
  searchProfilesJobDescStatus: 'idle',

  searchProfiles: [],
  selectedProfile: {} as any,
  selectedProfiles: [],
  jobCategory: [],
  searchProfileStatus: 'idle',
  searchProfilesStatus: 'idle',
  selectedProfileStatus: 'idle',
  createProfileStatus: 'idle',
  jobCategoryStatus: 'idle',
  error: null
};

// Async thunk for fetching users
export const fetchSearchProfile = createAsyncThunk('profile/fetchSearchProfile', async (data: any) => {
  const response = await axios.post<[]>(`${apiBaseAddress}/profiles`, data);
  return response.data;
});

export const fetchSearchProfileById = createAsyncThunk('profile/fetchSearchProfileById', async (id: string) => {
  const response = await axios.get<[]>(`${apiBaseAddress}/profiles/${id}`);
  return response.data;
});

export const fetchSelectedProfile = createAsyncThunk('profile/fetchSelectedProfile', async () => {
  const response = await axios.get<[]>(`${apiBaseAddress}/profiles/clientSelected?email=${getUseEmail()}`);
  return response.data;
});

export const fetchSelectedProfileById = createAsyncThunk('profile/fetchSelectedProfileById', async (id: string) => {
  const response = await axios.get<[]>(`${apiBaseAddress}/profiles/${id}`);
  return response.data;
});

export const createProfileInterview = createAsyncThunk('profile/createProfileInterview', async (data: IProfile) => {
  const response = await axios.post<[]>(`${apiBaseAddress}/profiles/add`, data);
  return response.data;
});

export const fetchJobCategory = createAsyncThunk('profile/fetchJobCategory', async (id: string) => {
  const response = await axios.get<[]>(`${apiBaseAddress}/profiles/jobProfiles?jobCategory=${id}`);
  return response.data;
});

export const fetchJobDescription = createAsyncThunk('profile/fetchJobDescription', async (data: any) => {
  const response = await axios.get<[]>(`${apiBaseAddress}/profiles/jobDescription?jobCategory=${data.jobCategory}&jobCategoryCode=${data.jobCategoryCode}`);
  return response.data;
});

const userSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchProfile.pending, (state: ProfileState) => {
        state.searchProfilesStatus = 'loading';
      })
      .addCase(fetchSearchProfile.fulfilled, (state: ProfileState, action: PayloadAction<any>) => {
        state.searchProfilesStatus = 'succeeded';
        state.searchProfiles = [...action.payload];
        state.searchProfilesJobDesc = action.payload.jobDetails
      })
      .addCase(fetchSearchProfile.rejected, (state: ProfileState, action) => {
        state.searchProfilesStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(fetchSearchProfileById.pending, (state: ProfileState) => {
        state.searchProfileStatus = 'loading';
      })
      .addCase(fetchSearchProfileById.fulfilled, (state: ProfileState, action: PayloadAction<any>) => {
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
      .addCase(fetchSelectedProfile.fulfilled, (state: ProfileState, action: PayloadAction<any>) => {
        state.selectedProfileStatus = 'succeeded';
        state.selectedProfiles = action.payload;
        console.log(action.payload)
      })
      .addCase(fetchSelectedProfile.rejected, (state: ProfileState, action) => {
        state.selectedProfileStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(createProfileInterview.pending, (state: ProfileState, action) => {
        state.createProfileStatus = 'loading';
      })
      .addCase(createProfileInterview.rejected, (state: ProfileState, action) => {
        state.createProfileStatus = 'failed';
      })
      .addCase(createProfileInterview.fulfilled, (state: ProfileState, action) => {
        state.createProfileStatus = 'succeeded';
      })
      .addCase(fetchJobCategory.pending, (state: ProfileState, action) => {
        state.jobCategoryStatus = 'loading';
      })
      .addCase(fetchJobCategory.fulfilled, (state: ProfileState, action) => {
        state.jobCategoryStatus = 'succeeded';
        state.jobCategory = [...action.payload];
        console.log(state.jobCategory)
      })
      .addCase(fetchJobDescription.fulfilled, (state: ProfileState, action) => {
        state.searchProfilesJobDescStatus = 'succeeded';
        state.searchProfilesJobDesc = action.payload
      })
      .addCase(fetchJobDescription.pending, (state: ProfileState, action) => {
        state.searchProfilesJobDescStatus = 'loading';
      })
  },
});
export const { reset } = userSlice.actions;

export default userSlice.reducer;
