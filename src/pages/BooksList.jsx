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
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Lista de Libros</h1>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/books/add" style={{ textDecoration: 'none' }}>
          <button style={addButtonStyle}>Agregar Nuevo Libro</button>
        </Link>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        {books.map(book => (
          <div key={book.id} style={cardStyle}>
            {book.coverUrl && (
              <img src={book.coverUrl} alt={`Portada de ${book.title}`} style={coverStyle} />
            )}
            <div style={{ padding: '1rem', flex: 1 }}>
              <h2 style={{ margin: '0 0 0.5rem 0' }}>{book.title}</h2>
              <p><strong>Autor:</strong> {book.author}</p>
              <p><strong>Género:</strong> {book.genre}</p>
              <p>{book.description}</p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <Link to={`/edit-book/${book.id}`} style={{ textDecoration: 'none', flex: 1 }}>
                  <button style={editButtonStyle}>Editar</button>
                </Link>
                <button
                  onClick={() => handleDelete(book.id)}
                  style={deleteButtonStyle}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Estilos
const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '250px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
};

const coverStyle = {
  width: '100%',
  height: '300px',
  objectFit: 'cover',
};

const addButtonStyle = {
  padding: '10px 20px',
  borderRadius: '8px',
  border: 'none',
  background: 'linear-gradient(135deg, #42a5f5, #80d6ff)',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const editButtonStyle = {
  flex: 1,
  padding: '8px',
  borderRadius: '6px',
  border: 'none',
  background: 'linear-gradient(135deg, #66bb6a, #a5d6a7)',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  flex: 1,
  padding: '8px',
  borderRadius: '6px',
  border: 'none',
  background: 'linear-gradient(135deg, #e57373, #ef9a9a)',
  color: '#7f0000',
  fontWeight: 'bold',
  cursor: 'pointer',
};
