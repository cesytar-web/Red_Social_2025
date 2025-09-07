import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    books: [{
            id: nanoid(),
            title: "Cien años de soledad",
            author: "Gabriel García Márquez",
            genre: "Realismo mágico",
            description: "Una novela sobre la familia Buendía y la aldea ficticia de Macondo.",
            coverUrl: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
        },
        {
            id: nanoid(),
            title: "Don Quijote de la Mancha",
            author: "Miguel de Cervantes",
            genre: "Novela clásica",
            description: "La historia de un hidalgo que se vuelve caballero andante.",
            coverUrl: "https://covers.openlibrary.org/b/id/8315076-L.jpg",
        },
    ],
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: {
            reducer: (state, action) => {
                state.books.push(action.payload);
            },
            prepare: (book) => {
                return {
                    payload: {
                        id: nanoid(),
                        ...book,
                    },
                };
            },
        },
        deleteBook: (state, action) => {
            state.books = state.books.filter(book => book.id !== action.payload);
        },
        updateBook: (state, action) => {
            const index = state.books.findIndex(book => book.id === action.payload.id);
            if (index !== -1) {
                state.books[index] = action.payload;
            }
        },
    },
});

export const { addBook, deleteBook, updateBook } = booksSlice.actions;
export default booksSlice.reducer;