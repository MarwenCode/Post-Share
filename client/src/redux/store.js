// store.js
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import userReducer from './slices/userSlice';
import followReducer from './slices/followSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    follow: followReducer,
    
  },
});

export default store;

