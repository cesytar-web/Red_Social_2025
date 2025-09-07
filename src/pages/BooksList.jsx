// src/pages/BooksList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook } from '../redux/books/booksSlice';
import { Link } from 'react-router-dom';

export default function BooksList() {
  const books = useSelector(state => state.books.books);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if(window.confirm('¿Estás seguro de eliminar este libro?')){
      dispatch(deleteBook(id));
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Lista de libros</h1>

      {/* Botón Agregar nuevo libro */}
      <Link to="/add-book" style={{ textDecoration: 'none' }}>
        <button style={buttonStyle}>Agregar nuevo libro</button>
      </Link>

      <div>
        {books.map(book => (
          <div key={book.id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
            <h3>{book.title}</h3>
            <p><strong>Autor:</strong> {book.author}</p>
            <p><strong>Género:</strong> {book.genre}</p>
            <p>{book.description}</p>
            {book.coverUrl && (
              <img src={book.coverUrl} alt={`Portada de ${book.title}`} style={{ maxWidth: '150px', borderRadius: '6px' }} />
            )}
            <div style={{ marginTop: '1rem' }}>
              {/* Botón Editar */}
              <Link to={`/edit-book/${book.id}`} style={{ textDecoration: 'none' }}>
                <button style={{ ...buttonStyle, marginRight: '12px' }}>Editar</button>
              </Link>

              {/* Botón Eliminar */}
              <button
                onClick={() => handleDelete(book.id)}
                style={{ 
                  ...buttonStyle, 
                  background: 'linear-gradient(135deg, #e57373, #ef9a9a)', 
                  color: '#7f0000' 
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '8px 14px',
  borderRadius: '12px',
  border: 'none',
  fontWeight: 'bold',
  cursor: 'pointer',
  background: 'linear-gradient(135deg, #66bb6a, #a5d6a7)',
  color: 'white',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transition: 'background 0.3s',
};
