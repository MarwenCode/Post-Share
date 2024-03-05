import { createSlice, createAsyncThunk,createAction  } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for user login
export const loginUser = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post("http://localhost:5500/api/auth/login", { email, password });

    if (response.status === 200) {
      return { status: response.status, data: response.data };
    } else {
      return rejectWithValue({ status: response.status, data: response.data });
    }
  } catch (error) {
    throw error;
  }
});



// Action to load user from localStorage during app startup
export const loadUserFromLocalStorage = createAction('user/loadUserFromLocalStorage');

// Action to load user by ID
// userSlice.js

// Action to load user by ID
export const loadUserById = createAsyncThunk('user/loadUserById', async (userId, { dispatch, rejectWithValue }) => {
  try {
    // Load the user from local storage
    dispatch(loadUserFromLocalStorage());
    // Fetch details of the user based on the ID
    const response = await axios.get(`http://localhost:5500/api/user/${userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


// ... (existing code)




// Initial user state based on local storage
const getStoredUser = () => {
  const storedUser = localStorage.getItem('user');
  console.log('Stored User:', storedUser);
  return storedUser ? JSON.parse(storedUser) : null;
};



// ... (existing code)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: getStoredUser(),
    profileCreated: getStoredUser() !== null,
    visitedUser: null,
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
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Login successful:', action.payload.data);
        state.data = action.payload.data;
        state.profileCreated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error('Login failed:', action.error);
        state.error = action.error.message;
      })

      .addCase(loadUserFromLocalStorage, (state) => {
        const storedUser = localStorage.getItem('user');
        state.data = storedUser ? JSON.parse(storedUser) : null;
        state.profileCreated = state.data !== null;
        state.error = null;
      })
    


      .addCase(loadUserById.fulfilled, (state, action) => {
        state.data = action.payload;  // Update the data field
        state.visitedUser = action.payload;
        state.error = null;
      })
      
    
      
      .addCase(loadUserById.rejected, (state, action) => {
        state.error = action.error.message;
      })
    
  },
});

console.log('Stored User:', getStoredUser());

// Export the action creators
export const { clearUser, setError, } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;