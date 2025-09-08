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

  // Cargar posts y usuarios al montar
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  // Filtrado seguro
  const filteredPosts = posts.filter(
    (post) =>
      (post.title || "").toLowerCase().includes(query.toLowerCase()) ||
      (post.content || "").toLowerCase().includes(query.toLowerCase())
  );

  const filteredUsers = users.filter((user) =>
    (user.username || "").toLowerCase().includes(query.toLowerCase())
  );

  // Agregar nueva publicación
  const handleAddPost = (newPost) => {
    if (!currentUser) return;
    dispatch(addPost(newPost));
  };

  // Toggle like
  const handleLikeToggle = (postId) => {
    if (!currentUser) return;
    dispatch(toggleLike({ postId, username: currentUser.username }));
  };

  // Editar publicación
  const handleEdit = (post) => {
    if (!post || !currentUser) return;
    if (post.author !== currentUser.username) return;

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
          {filteredPosts.map((post) => (
            <li key={post.id} style={{ marginBottom: "15px" }}>
              <h3>{post.title || "Sin título"}</h3>
              <p>{post.content || "Sin contenido"}</p>
              <p>
                <strong>Autor:</strong> {post.author || "Desconocido"}
              </p>

              <button onClick={() => handleLikeToggle(post.id)}>
                {post.likedBy?.includes(currentUser?.username)
                  ? "Quitar Like"
                  : "Dar Like"}{" "}
                ❤️ {post.likedBy?.length || 0}
              </button>

              {currentUser?.username === post.author && (
                <>
                  <button onClick={() => handleEdit(post)}>Editar</button>
                  <button onClick={() => handleDelete(post.id)}>Eliminar</button>
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
              {user.username || "Desconocido"} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
