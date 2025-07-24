import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const currentUser = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.posts.posts);

  if (!currentUser) {
    return <p>Debes iniciar sesión para ver tu perfil.</p>;
  }

  const userPosts = posts.filter((post) => post.author === currentUser.username);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Perfil de {currentUser.username}</h2>
      <p>Email: {currentUser.email}</p>

      <h3>Tus publicaciones</h3>
      {userPosts.length === 0 ? (
        <p>No has publicado nada aún.</p>
      ) : (
        userPosts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
