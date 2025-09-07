import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/books/booksSlice';
import { useNavigate } from 'react-router-dom';

const AddBookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    coverUrl: '',
    ISBN: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.author) {
      alert('El título y autor son obligatorios');
      return;
    }

    dispatch(addBook(form));
    navigate('/books'); // redirige a la lista de libros
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h2>Agregar nuevo libro</h2>
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
          value={form.ISBN}
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
          placeholder="Resumen del libro"
          value={form.description}
          onChange={handleChange}
          style={{ ...inputStyle, height: 100 }}
        />
        <button type="submit" style={buttonStyle}>Guardar libro</button>
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

export default AddBookForm;
