// src/components/AddPost.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function AddPost({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      // Obtenemos token desde localStorage
      const token = localStorage.getItem('token');

      // Petición POST al backend incluyendo token en headers
      const response = await axios.post(
        'http://localhost:8080/posts/create',
        { title, content },
        { headers: { Authorization: token } }
      );

      onAdd(response.data); // Enviamos el post creado al componente padre
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Error creando post:', err);
      alert('Error creando post.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        required
      />
      <br />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginTop: '8px' }}
        required
      />
      <br />
      <button type="submit" style={{ marginTop: '10px' }}>Agregar publicación</button>
    </form>
  );
}
