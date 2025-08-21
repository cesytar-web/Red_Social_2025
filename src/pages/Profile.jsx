import React from 'react';
import '../index.scss'; // Asegúrate de importar el CSS

export default function Profile({ currentUser, posts }) {
  if (!currentUser) {
    return <p className="no-posts">Debes iniciar sesión para ver tu perfil.</p>;
  }

  const userPosts = posts.filter((post) => post.author === currentUser.username);

  return (
    <div className="profile-container">
      <h2>Perfil de {currentUser.username}</h2>
      <p>Email: {currentUser.email}</p>

      <h3>Tus publicaciones</h3>
      {userPosts.length === 0 ? (
        <p className="no-posts">No has publicado nada aún.</p>
      ) : (
        userPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
