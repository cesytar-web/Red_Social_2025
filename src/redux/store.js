import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import postReducer from './postsSlice';
import commentsReducer from './comments/commentsSlice';
import booksReducer from './books/booksSlice'; // <-- Importa el nuevo slice

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
        comments: commentsReducer,
        books: booksReducer, // <-- Agrégalo aquí
    },
});