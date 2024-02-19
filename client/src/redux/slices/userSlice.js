// slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for user login
export const loginUser = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post("https://social-media-app-vp1y.onrender.com/api/auth/login", { email, password });

    if (response.status === 200) {
      return { status: response.status, data: response.data };
    } else {
      return rejectWithValue({ status: response.status, data: response.data });
    }
  } catch (error) {
    throw error;
  }
});

// Initial user state based on local storage
const getStoredUser = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

// Define the user slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: getStoredUser(), // Initialize with the stored user data
    profileCreated: getStoredUser() !== null, // Set to true if user data is available
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.data = null;
      state.profileCreated = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.profileCreated = true;
      state.error = null;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

// Export the action creators
export const { clearUser, setError } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;





