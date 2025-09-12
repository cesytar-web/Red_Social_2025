// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddPost from "../components/AddPost";
import {
  fetchPosts,
  addPost,
  editPost,
  deletePost,
  toggleLike,
} from "../redux/postsSlice";
import { fetchUsers } from "../redux/userSlice";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  // Agregar currentUser a la lista de usuarios si no está
  const allUsers = currentUser
    ? [...users, currentUser].filter(
        (value, index, self) =>
          index === self.findIndex((u) => u.email === value.email)
      )
    : users;

  // Filtrado de posts
  const filteredPosts = posts.filter(
    (post) =>
      (post.title || "").toLowerCase().includes(query.toLowerCase()) ||
      (post.content || "").toLowerCase().includes(query.toLowerCase())
  );

  // Filtrado de usuarios
  const filteredUsers = allUsers.filter(
    (user) =>
      (user.name || "").toLowerCase().includes(query.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(query.toLowerCase())
  );

  // Agregar nueva publicación
  const handleAddPost = (newPost) => {
    if (!currentUser) {
      alert("Debes estar logeado para publicar.");
      return;
    }
    dispatch(addPost({ ...newPost }));
  };

  // Dar / quitar like
  const handleLikeToggle = (postId) => {
    if (!currentUser) {
      alert("Debes estar logeado para dar like.");
      return;
    }
    dispatch(toggleLike({ postId, username: currentUser.name }));
  };

  // Editar publicación
  const handleEdit = (post) => {
    if (!post || !currentUser) return;
    if (post.author !== currentUser.name) return;

    const newTitle = prompt("Nuevo título:", post.title || "");
    const newContent = prompt("Nuevo contenido:", post.content || "");
    if (newTitle && newContent) {
      dispatch(editPost({ ...post, title: newTitle, content: newContent }));
    }
  };

  // Eliminar publicación
  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  return (
    <div className="main-container" style={{ padding: "20px" }}>
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
            <li key={post._id || post.id} style={{ marginBottom: "15px" }}>
              <h3>{post.title || "Sin título"}</h3>
              <p>{post.content || "Sin contenido"}</p>
              <p>
                <strong>Autor:</strong> {post.author || "Sin nombre"}
              </p>

              <button onClick={() => handleLikeToggle(post._id || post.id)}>
                {post.likedBy?.includes(currentUser?.name)
                  ? "Quitar Like"
                  : "Dar Like"}{" "}
                ❤️ {post.likedBy?.length || 0}
              </button>

              {currentUser?.name === post.author && (
                <>
                  <button onClick={() => handleEdit(post)}>Editar</button>
                  <button onClick={() => handleDelete(post._id || post.id)}>
                    Eliminar
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <h2>Usuarios</h2>
      {filteredUsers.length === 0 ? (
        <p>No hay usuarios que coincidan con la búsqueda.</p>
      ) : (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.email}>
              {user.name || "Sin nombre"} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
