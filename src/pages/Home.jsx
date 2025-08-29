// src/pages/Home.jsx
import React, { useState } from "react";
import AddPost from "../components/AddPost";

export default function Home({ currentUser }) {
  const [query, setQuery] = useState("");

  const [posts, setPosts] = useState([
    { id: 1, title: "Primer post", content: "Este es el contenido del primer post.", author: "Cecilia", likedBy: [] },
    { id: 2, title: "Segundo post", content: "Aquí va el contenido del segundo post.", author: "Juan", likedBy: [] },
  ]);

  const [users] = useState([
    { id: 1, username: "Cecilia" },
    { id: 2, username: "Juan" },
    { id: 3, username: "Ana" },
  ]);

  const handleAddPost = (newPost) => {
    const postWithId = { id: posts.length + 1, author: currentUser, likedBy: [], ...newPost };
    setPosts([postWithId, ...posts]);
  };

  const handleLikeToggle = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const hasLiked = post.likedBy.includes(currentUser);
          return {
            ...post,
            likedBy: hasLiked
              ? post.likedBy.filter((user) => user !== currentUser)
              : [...post.likedBy, currentUser],
          };
        }
        return post;
      })
    );
  };

  const handleEdit = (postId) => {
    const post = posts.find((p) => p.id === postId);
    const newTitle = prompt("Nuevo título:", post.title);
    const newContent = prompt("Nuevo contenido:", post.content);
    if (newTitle && newContent) {
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === postId ? { ...p, title: newTitle, content: newContent } : p))
      );
    }
  };

  // Eliminar sin alert
  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
  );

  const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
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
          {filteredPosts.map((post) => (
            <li key={post.id} style={{ marginBottom: "15px" }}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>
                <strong>Autor:</strong> {post.author}
              </p>
              <button onClick={() => handleLikeToggle(post.id)}>
                {post.likedBy.includes(currentUser) ? "Quitar Like" : "Dar Like"} ❤️ {post.likedBy.length}
              </button>
              {post.author === currentUser && (
                <>
                  <button onClick={() => handleEdit(post.id)}>Editar</button>
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
          {filteredUsers.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
