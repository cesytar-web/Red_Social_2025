// src/components/EditBookForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook } from '../redux/books/booksSlice';
import { useNavigate, useParams } from 'react-router-dom';

const EditBookForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const book = useSelector(state =>
    state.books.books.find(book => book.id === id)
  );

  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    coverUrl: '',
    ISBN: '',
  });

  useEffect(() => {
    if (book) {
      setForm(book);
    }
  }, [book]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.author) {
      alert('Título y Autor son obligatorios');
      return;
    }
    dispatch(updateBook(form));
    navigate('/books');
  };

  if (!book) return <p>Libro no encontrado</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h2>Editar Libro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="author"
          placeholder="Autor"
          value={form.author}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="genre"
          placeholder="Género"
          value={form.genre}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="ISBN"
          placeholder="ISBN"
          value={form.ISBN || ''}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="coverUrl"
          placeholder="URL de la portada"
          value={form.coverUrl}
          onChange={handleChange}
          style={inputStyle}
        />
        <textarea
          name="description"
          placeholder="Resumen"
          value={form.description}
          onChange={handleChange}
          style={{ ...inputStyle, height: 100 }}
        />
        <button type="submit" style={buttonStyle}>Guardar Cambios</button>
      </form>
    </div>
  );
};

const inputStyle = {
  display: 'block',
  marginBottom: '1rem',
  width: '100%',
  padding: '0.5rem',
  fontSize: '1rem',
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  cursor: 'pointer',
};

export default EditBookForm;
