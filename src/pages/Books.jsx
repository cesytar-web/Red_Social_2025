import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Books = () => {
  const books = useSelector((state) => state.books.books);

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <h1>Lista de Libros</h1>
      <Link to="/add-book" style={linkStyle}>➕ Agregar nuevo libro</Link>
      <div>
        {books.length === 0 && <p>No hay libros disponibles.</p>}
        {books.map((book) => (
          <div key={book.id} style={bookCardStyle}>
            <img
              src={book.coverUrl || 'https://via.placeholder.com/100x150?text=No+Image'}
              alt={`Portada de ${book.title}`}
              style={{ width: 100, height: 150, objectFit: 'cover', marginRight: '1rem' }}
            />
            <div>
              <h3>{book.title}</h3>
              <p><strong>Autor:</strong> {book.author}</p>
              <p><strong>Género:</strong> {book.genre}</p>
              <p>{book.description}</p>
              <p><strong>ISBN:</strong> {book.ISBN}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const bookCardStyle = {
  display: 'flex',
  marginBottom: '1.5rem',
  padding: '1rem',
  border: '1px solid #ddd',
  borderRadius: 5,
};

const linkStyle = {
  display: 'inline-block',
  marginBottom: '1rem',
  textDecoration: 'none',
  backgroundColor: '#4caf50',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: 4,
};

export default Books;

