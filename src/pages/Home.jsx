// src/pages/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddPost from "../components/AddPost";

export default function Home({ posts = [], setPosts, users = [], currentUser = "" }) {
  const [query, setQuery] = useState("");

  // Filtrado seguro de posts y usuarios
  const filteredPosts = posts.filter(
    post =>
      (post.title || "").toLowerCase().includes(query.toLowerCase()) ||
      (post.content || "").toLowerCase().includes(query.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    (user.username || "").toLowerCase().includes(query.toLowerCase())
  );

  const handleAddPost = (newPost) => {
    if (!currentUser) {
      console.error("No hay usuario actual para agregar post");
      return;
    }
    const postWithId = {
      id: Date.now(),
      author: currentUser,
      likedBy: [],
      comments: [],
      ...newPost,
    };
    setPosts([postWithId, ...posts]);
  };

  const handleEdit = (postId) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const newTitle = prompt("Nuevo título:", post.title || "");
    const newContent = prompt("Nuevo contenido:", post.content || "");
    if (newTitle && newContent) {
      setPosts(
        posts.map(p =>
          p.id === postId ? { ...p, title: newTitle, content: newContent } : p
        )
      );
    }
  };

  const handleDelete = (postId) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    setPosts(posts.filter(p => p.id !== postId));
  };

  const handleLikeToggle = (postId) => {
    const post = posts.find(p => p.id === postId);
    if (!post || !currentUser) return;

    const hasLiked = post.likedBy.includes(currentUser);
    const updatedPost = {
      ...post,
      likedBy: hasLiked
        ? post.likedBy.filter(user => user !== currentUser)
        : [...post.likedBy, currentUser],
    };

    setPosts(posts.map(p => (p.id === postId ? updatedPost : p)));
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
                <Link
                  to={`/posts/${post.id}`}
                  state={{ post }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {post.title || "Sin título"}
                </Link>
              </h3>
              <p>{post.content || "Sin contenido"}</p>
              <p><strong>Autor:</strong> {post.author || "Desconocido"}</p>

              <button onClick={() => handleLikeToggle(post.id)}>
                {post.likedBy.includes(currentUser) ? "Quitar Like" : "Dar Like"} ❤️ {post.likedBy.length || 0}
              </button>

              {currentUser && post.author && currentUser.toLowerCase() === post.author.toLowerCase() && (
                <>
                  <button onClick={() => handleEdit(post.id)}>Editar</button>
                  <button onClick={() => handleDelete(post.id)}>Eliminar</button>
                </>
              )}
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
            <li key={user.email}>{user.username || "Desconocido"} - {user.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
