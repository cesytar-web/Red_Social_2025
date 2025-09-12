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

  const allowedUsers = [
    "cecilia@example.com",
    "juan@example.com",
    "ana@example.com",
    "patricia@example.com",
  ];

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredPosts = posts.filter(
    (post) =>
      (post.title || "").toLowerCase().includes(query.toLowerCase()) ||
      (post.content || "").toLowerCase().includes(query.toLowerCase())
  );

  const filteredUsers = users.filter((user) =>
    allowedUsers.includes(user.email)
  );

  const handleAddPost = (newPost) => {
    if (!currentUser) return;
    dispatch(addPost({ ...newPost, author: currentUser.name }));
  };

  const handleLikeToggle = (postId) => {
    if (!currentUser) return;
    dispatch(toggleLike({ postId, username: currentUser.name }));
  };

  const handleEdit = (post) => {
    if (!post || !currentUser) return;
    if (post.author !== currentUser.name) return;

    const newTitle = prompt("Nuevo título:", post.title || "");
    const newContent = prompt("Nuevo contenido:", post.content || "");
    if (newTitle && newContent) {
      dispatch(editPost({ ...post, title: newTitle, content: newContent }));
    }
  };

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  return (
    <div className="main-container">
      {/* Título centrado */}
      <div className="title-container">
        <h1>Inicio</h1>
      </div>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar posts o usuarios..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {/* Agregar publicación */}
      <AddPost onAdd={handleAddPost} />

      {/* Publicaciones */}
      <section className="section">
        <h2>Publicaciones</h2>
        {filteredPosts.length === 0 ? (
          <p>No hay publicaciones que coincidan con la búsqueda.</p>
        ) : (
          <ul className="posts-list">
            {filteredPosts.map((post) => (
              <li key={post._id || post.id} className="post-card">
                <h4>{post.title || "Sin título"}</h4>
                <p>{post.content || "Sin contenido"}</p>
                <p className="author">
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
      </section>

      {/* Usuarios */}
      <section className="section">
        <h2>Usuarios</h2>
        {filteredUsers.length === 0 ? (
          <p>No hay usuarios que coincidan con la búsqueda.</p>
        ) : (
          <ul className="users-list">
            {filteredUsers.map((user) => (
              <li key={user.email}>
                {user.name || "Sin nombre"} - {user.email}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
