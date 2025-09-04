// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddPost from "../components/AddPost";

export default function Home({ posts, setPosts, users, currentUser }) {
  const [query, setQuery] = useState("");

  // Filtrado de posts y usuarios según búsqueda
  const filteredPosts = posts.filter(
    post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );

  // Funciones para manejar posts
  const handleAddPost = (newPost) => {
    const postWithId = { id: posts.length + 1, author: currentUser, likedBy: [], ...newPost };
    setPosts([postWithId, ...posts]);
  };

  const handleEdit = (postId) => {
    const post = posts.find(p => p.id === postId);
    const newTitle = prompt("Nuevo título:", post.title);
    const newContent = prompt("Nuevo contenido:", post.content);
    if (newTitle && newContent) {
      setPosts(posts.map(p => (p.id === postId ? { ...p, title: newTitle, content: newContent } : p)));
    }
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter(p => p.id !== postId));
  };

  const handleLikeToggle = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likedBy.includes(currentUser);
        return {
          ...post,
          likedBy: hasLiked
            ? post.likedBy.filter(user => user !== currentUser)
            : [...post.likedBy, currentUser]
        };
      }
      return post;
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Inicio</h1>

      <input
        type="text"
        placeholder="Buscar posts o usuarios..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: "15px", padding: "8px", width: "100%" }}
      />

      <AddPost onAdd={handleAddPost} />

      <h2>Publicaciones</h2>
      {filteredPosts.length === 0 ? (
        <p>No hay publicaciones que coincidan con la búsqueda.</p>
      ) : (
        <ul>
          {filteredPosts.map(post => (
            <li key={post.id} style={{ marginBottom: "15px" }}>
              <h3>
                <Link to={`/posts/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {post.title}
                </Link>
              </h3>
              <p>{post.content}</p>
              <p><strong>Autor:</strong> {post.author}</p>
              <button onClick={() => handleLikeToggle(post.id)}>
                {post.likedBy.includes(currentUser) ? "Quitar Like" : "Dar Like"} ❤️ {post.likedBy.length}
              </button>
              <button onClick={() => handleEdit(post.id)}>Editar</button>
              <button onClick={() => handleDelete(post.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}

      <h2>Lista de Usuarios</h2>
      {filteredUsers.length === 0 ? (
        <p>No hay usuarios que coincidan con la búsqueda.</p>
      ) : (
        <ul>
          {filteredUsers.map(user => (
            <li key={user.email}>{user.username} - {user.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
