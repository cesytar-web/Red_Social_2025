// src/redux/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// AsyncThunk para simular obtener publicaciones desde "backend"
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    return [
        { id: 1, title: "Primer post", content: "Contenido del primer post", author: "Cecilia", likedBy: [] },
        { id: 2, title: "Segundo post", content: "Contenido del segundo post", author: "Juan", likedBy: [] }
    ];
});

// AsyncThunk para agregar una nueva publicación
export const addPost = createAsyncThunk('posts/addPost', async(newPost, { getState }) => {
    const user = getState().auth.user;
    const post = {
        ...newPost,
        id: Date.now(),
        author: user && user.username ? user.username : 'anónimo',
        likedBy: []
    };
    return post;
});

// AsyncThunk para editar publicación
export const editPost = createAsyncThunk('posts/editPost', async(updatedPost) => {
    return updatedPost;
});

// AsyncThunk para eliminar una publicación
export const deletePost = createAsyncThunk('posts/deletePost', async(postId) => {
    return postId;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [
            { id: 1, title: "Primer post", content: "Contenido del primer post", author: "Cecilia", likedBy: [] },
            { id: 2, title: "Segundo post", content: "Contenido del segundo post", author: "Juan", likedBy: [] }
        ],
        status: 'idle',
        error: null
    },
    reducers: {
        toggleLike: (state, action) => {
            const payload = action.payload;
            const postId = payload.postId;
            const username = payload.username;

            const post = state.items.find(function(p) { return p.id === postId; });
            if (!post) return;

            if (!post.likedBy) post.likedBy = [];

            var index = post.likedBy.indexOf(username);
            if (index !== -1) {
                post.likedBy = post.likedBy.filter(function(u) { return u !== username; });
            } else {
                post.likedBy.push(username);
            }
        }
    },
    extraReducers: function(builder) {
        builder
            .addCase(fetchPosts.fulfilled, function(state, action) {
                state.items = action.payload.map(function(p) {
                    return {
                        id: p.id,
                        title: p.title,
                        content: p.content,
                        author: p.author,
                        likedBy: p.likedBy ? p.likedBy : []
                    };
                });
            })
            .addCase(addPost.fulfilled, function(state, action) {
                state.items.push(action.payload);
            })
            .addCase(editPost.fulfilled, function(state, action) {
                var index = state.items.findIndex(function(post) { return post.id === action.payload.id; });
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deletePost.fulfilled, function(state, action) {
                state.items = state.items.filter(function(post) { return post.id !== action.payload; });
            });
    }
});

export const toggleLike = postsSlice.actions.toggleLike;
export default postsSlice.reducer;