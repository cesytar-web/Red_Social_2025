import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import postReducer from './postsSlice'; // 👈 Importa

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer, // 👈 Registra
  },
});
