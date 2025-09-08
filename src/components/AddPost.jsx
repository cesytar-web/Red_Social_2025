// src/components/AddPost.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AddPost({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Tomar el usuario actual desde el slice user
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Por favor completa todos los campos.');
      return;
    }

    if (!currentUser) {
      alert('Debes estar logueado para agregar una publicación.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:8080/posts/create',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`, // formato estándar JWT
            'Content-Type': 'application/json',
          },
        }
      );

      // Agregar el post al estado de Redux a través de onAdd
      onAdd({
        ...response.data,
        author: currentUser.username,
        likedBy: response.data.likedBy || []
      });

      setTitle('');
      setContent('');
    } catch (err) {
      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
      } else if (err.request) {
        console.error('Error request:', err.request);
      } else {
        console.error('Error message:', err.message);
      }
      alert('Error creando post. Revisa la consola para más detalles.');
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
