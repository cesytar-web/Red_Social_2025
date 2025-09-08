// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import postsReducer from './postsSlice';
import commentsReducer from './comments/commentsSlice';
import booksReducer from './books/booksSlice';
import userReducer from './userSlice'; // <-- import correcto

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
        comments: commentsReducer,
        books: booksReducer,
        user: userReducer, // <-- clave para acceder a userSlice
    },
});