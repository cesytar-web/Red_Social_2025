// src/pages/AddBook.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/books/booksSlice';

export default function AddBook() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    genero: '',
    resumen: '',
    portadaUrl: '',
    ISBN: ''
  });

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addBook(formData));
    setFormData({
      titulo: '',
      autor: '',
      genero: '',
      resumen: '',
      portadaUrl: '',
      ISBN: ''
    });
    alert('Libro agregado!');
  };

  return (
    <div>
      <h2>Agregar Nuevo Libro</h2>
      <form onSubmit={handleSubmit}>
        <input name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título" required />
        <input name="autor" value={formData.autor} onChange={handleChange} placeholder="Autor" required />
        <input name="genero" value={formData.genero} onChange={handleChange} placeholder="Género" />
        <textarea name="resumen" value={formData.resumen} onChange={handleChange} placeholder="Resumen" />
        <input name="portadaUrl" value={formData.portadaUrl} onChange={handleChange} placeholder="URL Portada" />
        <input name="ISBN" value={formData.ISBN} onChange={handleChange} placeholder="ISBN" />
        <button type="submit">Agregar Libro</button>
      </form>
    </div>
  );
}
