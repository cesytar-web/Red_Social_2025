import React from 'react';

export default function Profile({ currentUser, posts }) {
  if (!currentUser) {
    return <p>Debes iniciar sesión para ver tu perfil.</p>;
  }

  const userPosts = posts.filter((post) => post.author === currentUser.username);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Perfil de {currentUser.username}</h2>
      <p>Email: {currentUser.email}</p>

      <h3 style={{ marginTop: '20px' }}>Tus publicaciones</h3>
      {userPosts.length === 0 ? (
        <p>No has publicado nada aún.</p>
      ) : (
        userPosts.map((post) => (
          <div
            key={post.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
