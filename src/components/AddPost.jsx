import React, { useState } from 'react';

export default function AddPost({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Por favor completa todos los campos.');
      return;
    }
    onAdd({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Título de la publicación"
        required
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />
      <br />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        aria-label="Contenido de la publicación"
        required
        rows={4}
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginTop: '8px' }}
      />
      <br />
      <button type="submit" style={{ marginTop: '10px' }}>Agregar publicación</button>
    </form>
  );
}
