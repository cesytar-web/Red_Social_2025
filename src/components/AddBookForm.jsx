// src/components/AddBookForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/books/booksSlice';
import { useNavigate } from 'react-router-dom';

export default function AddBookForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    coverUrl: '',
    ISBN: ''
  });

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addBook(formData));
    setFormData({
      title: '',
      author: '',
      genre: '',
      description: '',
      coverUrl: '',
      ISBN: ''
    });
    alert('Libro agregado!');
    navigate('/books'); // Redirige a lista de libros
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Agregar Nuevo Libro</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Título" required style={inputStyle} />
        <input name="author" value={formData.author} onChange={handleChange} placeholder="Autor" required style={inputStyle} />
        <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Género" style={inputStyle} />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" style={inputStyle} />
        <input name="coverUrl" value={formData.coverUrl} onChange={handleChange} placeholder="URL Portada" style={inputStyle} />
        <input name="ISBN" value={formData.ISBN} onChange={handleChange} placeholder="ISBN" style={inputStyle} />
        <button type="submit" style={buttonStyle}>Agregar Libro</button>
      </form>
    </div>
  );
}

const inputStyle = {
  marginBottom: '10px',
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '10px',
  borderRadius: '8px',
  border: 'none',
  background: 'linear-gradient(135deg, #66bb6a, #a5d6a7)',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer'
};
