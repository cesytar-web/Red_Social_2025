// src/redux/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// AsyncThunk para simular obtener publicaciones desde "backend"
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  return [
    { id: 1, title: "Primer post", content: "Contenido del primer post", author: "Cecilia" },
    { id: 2, title: "Segundo post", content: "Contenido del segundo post", author: "Juan" }
  ];
});

// AsyncThunk para agregar una nueva publicación
export const addPost = createAsyncThunk('posts/addPost', async (newPost, { getState }) => {
  const user = getState().auth.user;
  const post = {
    ...newPost,
    id: Date.now(),
    author: user?.username || 'anónimo',
  };
  return post;
});

// AsyncThunk para editar publicación
export const editPost = createAsyncThunk('posts/editPost', async (updatedPost) => {
  return updatedPost;
});

// AsyncThunk para eliminar una publicación
export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
  return postId;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [
      { id: 1, title: "Primer post", content: "Contenido del primer post", author: "Cecilia" },
      { id: 2, title: "Segundo post", content: "Contenido del segundo post", author: "Juan" }
    ],
    status: 'idle',
    error: null
  },
  reducers: {},
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
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post.id !== action.payload);
      });
  }
});

export default postsSlice.reducer;
