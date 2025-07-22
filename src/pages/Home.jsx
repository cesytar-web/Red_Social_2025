import React, { useState } from 'react';
import AddPost from '../components/AddPost';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const currentUser = 'Cecilia';

  const [posts, setPosts] = useState([
    { id: 1, title: 'Primer post', content: 'Este es el contenido del primer post.', author: 'Cecilia', likedBy: [] },
    { id: 2, title: 'Segundo post', content: 'Aquí va el contenido del segundo post.', author: 'Juan', likedBy: [] },
  ]);

  const [users] = useState([
    { id: 1, username: 'Cecilia' },
    { id: 2, username: 'Juan' },
    { id: 3, username: 'Maria' },
  ]);

  const [filteredResults, setFilteredResults] = useState({ posts, users });

  function handleAddPost(newPost) {
    const postWithId = {
      id: posts.length + 1,
      author: currentUser,
      likedBy: [],
      ...newPost
    };
    const newPosts = [postWithId, ...posts];
    setPosts(newPosts);
    setFilteredResults({ posts: newPosts, users }); // actualizar también filtro
  }

  // Esta función recibe resultados filtrados del SearchBar
  function handleSearchResults(results) {
    setFilteredResults(results);
  }

  return (
    <div>
      <h1>Inicio</h1>

      <SearchBar posts={posts} users={users} onResults={handleSearchResults} />

      <AddPost onAdd={handleAddPost} />

      <h2>Posts</h2>
      <ul>
        {filteredResults.posts.map(post => (
          <li key={post.id} style={{ marginBottom: '15px' }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p><strong>Autor:</strong> {post.author}</p>
          </li>
        ))}
      </ul>

      <h2>Usuarios</h2>
      <ul>
        {filteredResults.users.map(user => (
          <li key={user.id}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
