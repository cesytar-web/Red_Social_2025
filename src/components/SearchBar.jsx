import React, { useState } from 'react';

export default function SearchBar({ posts, users, onResults }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filtrar posts y usuarios por título, contenido o username
    const filteredPosts = posts.filter(
      post => post.title.toLowerCase().includes(value.toLowerCase()) ||
              post.content.toLowerCase().includes(value.toLowerCase())
    );
    const filteredUsers = users.filter(
      user => user.username.toLowerCase().includes(value.toLowerCase())
    );

    // Devolver los resultados al componente padre
    onResults({ posts: filteredPosts, users: filteredUsers });
  };

  return (
    <input
      type="text"
      placeholder="Buscar posts o usuarios..."
      value={query}
      onChange={handleChange}
      style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
    />
  );
}
