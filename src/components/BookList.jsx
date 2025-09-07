// src/components/BooksList.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const BooksList = () => {
  const books = useSelector((state) => state.books.books);

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <h2>Lista de libros</h2>
      {books.length === 0 && <p>No hay libros para mostrar.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {books.map((book) => (
          <li key={book.id} style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            {book.coverUrl && (
              <img
                src={book.coverUrl}
                alt={`Portada de ${book.title}`}
                style={{ width: 100, height: 150, objectFit: 'cover', float: 'left', marginRight: '1rem' }}
              />
            )}
            <h3>{book.title}</h3>
            <p><strong>Autor:</strong> {book.author}</p>
            <p><strong>Género:</strong> {book.genre}</p>
            <p>{book.description}</p>
            <div style={{ clear: 'both' }}></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
