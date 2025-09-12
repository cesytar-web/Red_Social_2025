// src/components/AddPost.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AddPost({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const token = currentUser?.token || localStorage.getItem('token');

    if (!token) {
      alert('Debes estar logueado para agregar una publicación.');
      return;
    }

    try {
      const postData = {
        title,
        content,
        author: currentUser?.name, // usar name como autor
        likedBy: [],               // inicializar likedBy vacío
      };

      const response = await axios.post(
        'http://localhost:8080/posts/create',
        postData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onAdd({
        _id: response.data._id,
        title: response.data.title,
        content: response.data.content,
        author: currentUser.name,
        likedBy: response.data.likedBy || [],
      });

      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Error al crear post:', err.response?.data || err.message);
      alert('Error creando publicación. Revisa la consola.');
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
