import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        username: 'Cecilia',
        email: 'test@test.com',
        librosLeidos: [],
        librosPorLeer: [],
        librosFavoritos: [],
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            // asegúrate que payload contenga los arrays librosLeidos, librosPorLeer, librosFavoritos o inicialízalos aquí
        },
        logout: (state) => {
            state.user = null;
        },
        agregarLibroLeido: (state, action) => {
            state.user.librosLeidos.push(action.payload); // payload es el ID del libro
        },
        eliminarLibroLeido: (state, action) => {
            state.user.librosLeidos = state.user.librosLeidos.filter(id => id !== action.payload);
        },
        // igual para librosPorLeer y librosFavoritos
        agregarLibroPorLeer: (state, action) => {
            state.user.librosPorLeer.push(action.payload);
        },
        eliminarLibroPorLeer: (state, action) => {
            state.user.librosPorLeer = state.user.librosPorLeer.filter(id => id !== action.payload);
        },
        agregarLibroFavorito: (state, action) => {
            state.user.librosFavoritos.push(action.payload);
        },
        eliminarLibroFavorito: (state, action) => {
            state.user.librosFavoritos = state.user.librosFavoritos.filter(id => id !== action.payload);
        },
    },
});

export const {
    login,
    logout,
    agregarLibroLeido,
    eliminarLibroLeido,
    agregarLibroPorLeer,
    eliminarLibroPorLeer,
    agregarLibroFavorito,
    eliminarLibroFavorito,
} = authSlice.actions;
export default authSlice.reducer;