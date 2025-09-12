// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async() => {
    return [
        { name: 'Cecilia', email: 'cecilia@example.com' },
        { name: 'Juan', email: 'juan@example.com' },
        { name: 'Ana', email: 'ana@example.com' }
    ];
});

export const addUser = createAsyncThunk('user/addUser', async(newUser) => newUser);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        currentUser: null
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            if (!state.users.find(u => u.email === action.payload.email)) {
                state.users.push({ name: action.payload.name, email: action.payload.email });
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            });
    }
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;