// src/components/BookCard.jsx
import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div style={styles.card}>
      {book.portadaUrl && (
        <img src={book.portadaUrl} alt={`Portada de ${book.titulo}`} style={styles.portada} />
      )}
      <div style={styles.info}>
        <h3>{book.titulo}</h3>
        <p><strong>Autor:</strong> {book.autor}</p>
        <p><strong>Género:</strong> {book.genero}</p>
        <p>{book.resumen}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    display: 'flex',
    maxWidth: 600,
  },
  portada: {
    width: 120,
    height: 180,
    objectFit: 'cover',
    marginRight: 16,
    borderRadius: 4,
  },
  info: {
    flex: 1,
  },
};

export default BookCard;
