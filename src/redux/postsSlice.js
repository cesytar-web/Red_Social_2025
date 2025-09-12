// src/redux/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    return [
        { id: 1, title: "Primer post", content: "Contenido del primer post", author: "Cecilia", likedBy: [] },
        { id: 2, title: "Segundo post", content: "Contenido del segundo post", author: "Juan", likedBy: [] }
    ];
});

export const addPost = createAsyncThunk('posts/addPost', async(newPost, { getState }) => {
    const currentUser = getState().user.currentUser;
    return {
        ...newPost,
        id: Date.now(),
        author: currentUser ? currentUser.name : "anónimo",
        likedBy: []
    };
});

export const editPost = createAsyncThunk('posts/editPost', async(updatedPost) => updatedPost);
export const deletePost = createAsyncThunk('posts/deletePost', async(postId) => postId);

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {
        toggleLike: (state, action) => {
            const { postId, username } = action.payload;
            const post = state.items.find(p => p.id === postId);
            if (!post) return;
            if (!post.likedBy) post.likedBy = [];
            if (post.likedBy.includes(username)) {
                post.likedBy = post.likedBy.filter(u => u !== username);
            } else {
                post.likedBy.push(username);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(editPost.fulfilled, (state, action) => {
                const index = state.items.findIndex(post => post.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.items = state.items.filter(post => post.id !== action.payload);
            });
    }
});

export const { toggleLike } = postsSlice.actions;
export default postsSlice.reducer;