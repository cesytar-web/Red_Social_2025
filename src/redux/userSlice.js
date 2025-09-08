// src/store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Traer usuarios desde el backend
export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async(_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:4000/api/usuarios', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error('Error al obtener usuarios');
            const data = await res.json();
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Registrar usuario en backend
export const registerUserBackend = createAsyncThunk(
    'user/registerUserBackend',
    async(newUser, { rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:4000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            if (!res.ok) throw new Error('Error al registrar usuario');
            const data = await res.json();
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Login usuario (recibe token desde backend)
export const loginUserBackend = createAsyncThunk(
    'user/loginUserBackend',
    async(credentials, { rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            if (!res.ok) throw new Error('Correo o contraseña incorrecta');
            const data = await res.json(); // data debe incluir token y usuario
            localStorage.setItem('token', data.token);
            return data.user;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const initialState = {
    users: [],
    currentUser: null,
    status: 'idle',
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.currentUser = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(registerUserBackend.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(loginUserBackend.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(loginUserBackend.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;