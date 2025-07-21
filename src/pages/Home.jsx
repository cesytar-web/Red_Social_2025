import React, { useState } from 'react';
import AddPost from '../components/AddPost';

export default function Home() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Primer post', content: 'Este es el contenido del primer post.' },
    { id: 2, title: 'Segundo post', content: 'Aquí va el contenido del segundo post.' },
  ]);

  // Función para agregar un post nuevo, pasada a AddPost
  function handleAddPost(newPost) {
    // Agrega un id único incremental al post nuevo
    const postWithId = { id: posts.length + 1, ...newPost };
    setPosts([postWithId, ...posts]);
  }

  return (
    <div>
      <h1>Inicio</h1>

      {/* Pasa la función con la prop correcta "onAdd" */}
      <AddPost onAdd={handleAddPost} />

      {/* Lista de posts */}
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: '15px' }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
