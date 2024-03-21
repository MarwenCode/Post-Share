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



export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, updatedData }, { rejectWithValue }) => {
    try {
      // Assuming the server expects 'multipart/form-data' for file upload
      const formData = new FormData();
      for (const key in updatedData) {
        formData.append(key, updatedData[key]);
      }

      const response = await axios.put(`http://localhost:5500/api/user/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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

      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
      });
    
  },
});

console.log('Stored User:', getStoredUser());

// Export the action creators
export const { clearUser, setError, } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;




// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';


// // Utilisation de import.meta pour accéder aux variables d'environnement
// const apiUrl = import.meta.env.MODE === 'production' ? import.meta.env.VITE_REACT_APP_API_URL_PROD : import.meta.env.VITE_REACT_APP_API_URL;

// // const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL;


// console.log(apiUrl)

// // Async thunk for user login
// export const loginUser = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
//   try {
    
    

//     const response = await axios.post(`${apiUrl}/auth/login`, { email, password });

//     if (response.status === 200) {
//       return { status: response.status, data: response.data };
//     } else {
//       return rejectWithValue({ status: response.status, data: response.data });
//     }
//   } catch (error) {
//     throw error;
//   }
// });


// // Function to get stored user from local storage
// const getStoredUser = () => {
//   const storedUser = localStorage.getItem('user');
//   console.log('Stored User:', storedUser);
//   return storedUser ? JSON.parse(storedUser) : null;
// };

// // Async thunk to update user
// export const updateUser = createAsyncThunk(
//   'user/updateUser',
//   async ({ userId, updatedData }, { rejectWithValue }) => {
//     try {
//       // Constructing form data for update request
//       const formData = new FormData();
//       for (const key in updatedData) {
//         formData.append(key, updatedData[key]);
//       }

//       const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/${userId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       return response.data.updatedUser;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Create user slice
// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     data: getStoredUser(),
//     profileCreated: getStoredUser() !== null,
//     visitedUser: null,
//     error: null,
//   },
//   reducers: {
//     clearUser: (state) => {
//       state.data = null;
//       state.profileCreated = false;
//       state.error = null;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.fulfilled, (state, action) => {
//         console.log('Login successful:', action.payload.data);
//         state.data = action.payload.data;
//         state.profileCreated = true;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         console.error('Login failed:', action.error);
//         state.error = action.error.message;
//       })
     
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.data = action.payload;
//       });
//   },
// });

// console.log('Stored User:', getStoredUser());

// // Export action creators and reducer
// export const { clearUser, setError } = userSlice.actions;
// export default userSlice.reducer;
