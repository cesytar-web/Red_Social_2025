import React from 'react';

export default function Profile({ currentUser, posts }) {
  // Filtrar solo los posts del usuario actual
  const userPosts = posts.filter(post => post.author === currentUser.username);

  return (
    <div>
      <h1>Perfil de {currentUser.username}</h1>
      <p>Email: {currentUser.email}</p>

      <h2>Tus publicaciones</h2>
      {userPosts.length === 0 ? (
        <p>No tienes publicaciones aún.</p>
      ) : (
        <ul>
          {userPosts.map(post => (
            <li key={post.id} style={{ marginBottom: '10px' }}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
