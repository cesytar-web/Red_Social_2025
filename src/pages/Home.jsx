import React from 'react';
import AddPost from '../components/AddPost';

export default function Home({ posts, setPosts, currentUser }) {

  function handleAddPost(newPost) {
    const postWithId = {
      id: posts.length + 1,
      author: currentUser.username,
      likedBy: [],
      ...newPost
    };
    setPosts([postWithId, ...posts]);
  }

  // Aquí puedes incluir también funciones para editar, eliminar, like, etc. como tenías antes.

  return (
    <div>
      <h1>Inicio</h1>
      <AddPost onAdd={handleAddPost} />

      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: '15px' }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p><strong>Autor:</strong> {post.author}</p>
            {/* Botones de like, editar y eliminar aquí */}
          </li>
        ))}
      </ul>
    </div>
  );
}
