import React, { useState } from 'react';
import AddPost from '../components/AddPost';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const currentUser = 'Cecilia';

  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Primer post',
      content: 'Este es el contenido del primer post.',
      author: 'Cecilia',
      likedBy: [],
    },
    {
      id: 2,
      title: 'Segundo post',
      content: 'Aquí va el contenido del segundo post.',
      author: 'Juan',
      likedBy: [],
    },
  ]);

  // Lista de usuarios simulada
  const [users] = useState([
    { id: 1, username: 'Cecilia' },
    { id: 2, username: 'Juan' },
    { id: 3, username: 'Ana' },
  ]);

  function handleAddPost(newPost) {
    const postWithId = {
      id: posts.length + 1,
      author: currentUser,
      likedBy: [],
      ...newPost,
    };
    setPosts([postWithId, ...posts]);
  }

  function handleLikeToggle(postId) {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const hasLiked = post.likedBy.includes(currentUser);
          const updatedLikes = hasLiked
            ? post.likedBy.filter(user => user !== currentUser)
            : [...post.likedBy, currentUser];
          return { ...post, likedBy: updatedLikes };
        }
        return post;
      })
    );
  }

  function handleDelete(postId) {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  }

  function handleEdit(postId, newTitle, newContent) {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, title: newTitle, content: newContent } : post
      )
    );
  }

  // Filtro de publicaciones
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.content.toLowerCase().includes(query.toLowerCase())
  );

  // Filtro de usuarios
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Inicio</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <AddPost onAdd={handleAddPost} />

      <h2>Publicaciones</h2>
      {filteredPosts.length === 0 ? (
        <p>No hay publicaciones que coincidan con la búsqueda.</p>
      ) : (
        <ul>
          {filteredPosts.map(post => (
            <li key={post.id} style={{ marginBottom: '15px' }}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p><strong>Autor:</strong> {post.author}</p>

              <button onClick={() => handleLikeToggle(post.id)}>
                {post.likedBy.includes(currentUser) ? 'Quitar Like' : 'Dar Like'}
              </button>
              <span> ❤️ {post.likedBy.length}</span>

              {post.author === currentUser && (
                <>
                  <button
                    onClick={() => {
                      const newTitle = prompt('Nuevo título:', post.title);
                      const newContent = prompt('Nuevo contenido:', post.content);
                      if (newTitle && newContent) {
                        handleEdit(post.id, newTitle, newContent);
                      }
                    }}
                  >
                    Editar
                  </button>
                  <button onClick={() => handleDelete(post.id)}>Eliminar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <h2>Usuarios encontrados</h2>
      {filteredUsers.length === 0 ? (
        <p>No hay usuarios que coincidan con la búsqueda.</p>
      ) : (
        <ul>
          {filteredUsers.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
