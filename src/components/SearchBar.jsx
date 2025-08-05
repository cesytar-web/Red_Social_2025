import React from 'react';

export default function SearchBar({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Buscar publicaciones o usuarios..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{
        width: '100%',
        padding: '8px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}
    />
  );
}
