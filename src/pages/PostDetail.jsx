// src/pages/PostDetail.jsx
import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function PostDetail({ posts, setPosts, currentUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtenemos el post desde router state
  const initialPost = location.state?.post;
  const [post, setPost] = useState(initialPost || null);
  const [newComment, setNewComment] = useState("");

  if (!post) return <p>Publicación no encontrada.</p>;

  // Eliminar post
  const handleDelete = () => {
    if (window.confirm("¿Seguro que deseas eliminar esta publicación?")) {
      setPosts(posts.filter(p => p.id !== post.id));
      navigate("/home");
    }
  };

  // Editar post
  const handleEdit = () => {
    const newTitle = prompt("Nuevo título:", post.title);
    const newContent = prompt("Nuevo contenido:", post.content);
    if (newTitle && newContent) {
      const updatedPost = { ...post, title: newTitle, content: newContent };
      setPost(updatedPost);
      setPosts(posts.map(p => p.id === post.id ? updatedPost : p));
    }
  };

  // Dar/quitar like
  const handleLikeToggle = () => {
    const hasLiked = post.likedBy?.includes(currentUser);
    const updatedLikes = hasLiked
      ? post.likedBy.filter(u => u !== currentUser)
      : [...(post.likedBy || []), currentUser];

    const updatedPost = { ...post, likedBy: updatedLikes };
    setPost(updatedPost);
    setPosts(posts.map(p => p.id === post.id ? updatedPost : p));
  };

  // Agregar comentario
  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const updatedComments = post.comments ? [...post.comments, { author: currentUser, content: newComment }] : [{ author: currentUser, content: newComment }];
    const updatedPost = { ...post, comments: updatedComments };
    setPost(updatedPost);
    setPosts(posts.map(p => p.id === post.id ? updatedPost : p));
    setNewComment("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><i>Autor: {post.author}</i></p>

      {/* Botones solo si es autor */}
      {currentUser === post.author && (
        <>
          <button onClick={handleEdit} style={buttonStyle}>Editar</button>
          <button onClick={handleDelete} style={{ ...buttonStyle, backgroundColor: "#e74c3c" }}>Eliminar</button>
        </>
      )}

      {/* Dar Like */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleLikeToggle}>
          {post.likedBy?.includes(currentUser) ? "Quitar Like" : "Dar Like"} ❤️ {post.likedBy?.length || 0}
        </button>
      </div>

      {/* Comentarios */}
      <div style={{ marginTop: "20px" }}>
        <h3>Comentarios</h3>
        {post.comments && post.comments.length > 0 ? (
          <ul>
            {post.comments.map((c, idx) => (
              <li key={idx}><strong>{c.author}:</strong> {c.content}</li>
            ))}
          </ul>
        ) : (
          <p>No hay comentarios aún.</p>
        )}

        <textarea
          rows={3}
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={inputStyle}
        />
        <br />
        <button onClick={handleAddComment} style={buttonStyle}>Agregar Comentario</button>
      </div>

      <hr />
      <Link to="/home">Volver a Inicio</Link>
    </div>
  );
}

const buttonStyle = {
  marginRight: "10px",
  padding: "6px 12px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#3498db",
  color: "white",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  fontSize: "1rem",
  marginTop: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};
