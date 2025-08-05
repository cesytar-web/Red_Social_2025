// src/redux/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { username: 'Cecilia', email: 'test@test.com' }, // Simulación de sesión iniciada
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
