// src/redux/comments/commentsSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  comments: [], // { id, postId, author, content, createdAt }
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: {
      reducer(state, action) {
        state.comments.push(action.payload);
      },
      prepare({ postId, content, author }) {
        return {
          payload: {
            id: nanoid(),
            postId,
            content,
            author,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
