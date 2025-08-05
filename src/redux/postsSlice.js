import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulación de una base de datos local temporal
let mockPosts = [
  { id: 1, title: 'Primera publicación', content: 'Contenido de ejemplo', author: 'admin' }
];

// AsyncThunk para simular obtener publicaciones
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  return mockPosts;
});

// AsyncThunk para agregar una nueva publicación
export const addPost = createAsyncThunk('posts/addPost', async (newPost, { getState }) => {
  const user = getState().auth.user;
  const post = {
    ...newPost,
    id: Date.now(),
    author: user?.username || 'anónimo',
  };
  mockPosts.push(post);
  return post;
});

// AsyncThunk para editar publicación
export const editPost = createAsyncThunk('posts/editPost', async (updatedPost) => {
  const index = mockPosts.findIndex((p) => p.id === updatedPost.id);
  if (index !== -1) {
    mockPosts[index] = updatedPost;
  }
  return updatedPost;
});

// AsyncThunk para eliminar una publicación
export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
  mockPosts = mockPosts.filter((p) => p.id !== postId);
  return postId;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
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
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post.id !== action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.items.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  }
});

export default postSlice.reducer;
