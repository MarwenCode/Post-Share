// client/src/redux/slices/followSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const follow = createAsyncThunk('follow/follow', async (id) => {
//   const response = await axios.put(`http://localhost:5500/api/user/follow/${id}`);
//   return response.data;
// });

// export const unfollow = createAsyncThunk('follow/unfollow', async (id) => {
//   const response = await axios.put(`http://localhost:5500/api/user/unfollow/${id}`);
//   return response.data;
// });


  // Replace this with the actual user ID



export const follow = createAsyncThunk('follow/follow', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.put(`https://postandshare-api.onrender.com/api/user/follow/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const unfollow = createAsyncThunk('follow/unfollow', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.put(`https://postandshare-api.onrender.com/api/user/unfollow/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


const followSlice = createSlice({
  name: 'follow',
  initialState: {
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(follow.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(unfollow.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default followSlice.reducer;
