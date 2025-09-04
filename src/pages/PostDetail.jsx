// src/pages/PostDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, deletePost, editPost } from "../redux/postsSlice";

export default function PostDetail() {
  const { postId } = useParams(); // Id del post desde la URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.items);
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");

  // Traer posts si no existen
  useEffect(() => {
    const loadPosts = async () => {
      if (posts.length === 0) {
        await dispatch(fetchPosts());
      }
      setLoading(false);
    };
    loadPosts();
  }, [dispatch, posts.length]);

  // Buscar post cuando posts cambian o postId cambia
  useEffect(() => {
    if (posts.length > 0) {
      const foundPost = posts.find((p) => String(p.id) === String(postId));
      setPost(foundPost || null);
    }
  }, [posts, postId]);

  if (loading) return <p>Cargando publicación...</p>;
  if (!post) return <p>Publicación no encontrada.</p>;

  // Función para eliminar post con confirmación
  const handleDelete = () => {
    if (window.confirm("¿Seguro que deseas eliminar esta publicación?")) {
      dispatch(deletePost(post.id));
      navigate("/home");
    }
  };

  // Función para dar/quitar like
  const handleLikeToggle = () => {
    const hasLiked = post.likedBy?.includes(user.username);
    const updatedLikes = hasLiked
      ? post.likedBy.filter((u) => u !== user.username)
      : [...(post.likedBy || []), user.username];

    const updatedPost = { ...post, likedBy: updatedLikes };
    setPost(updatedPost);
    dispatch(editPost(updatedPost));
  };

  // Función para agregar comentario temporal
  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const updatedComments = post.comments ? [...post.comments, { author: user.username, content: newComment }] : [{ author: user.username, content: newComment }];
    const updatedPost = { ...post, comments: updatedComments };
    setPost(updatedPost);
    dispatch(editPost(updatedPost));
    setNewComment("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>
        <i>Autor: {post.author}</i>
      </p>

      {/* Botones editar y eliminar solo si es autor */}
      {user?.username === post.author && (
        <>
          <Link to={`/edit-post/${post.id}`}>
            <button style={buttonStyle}>Editar</button>
          </Link>
          <button
            style={{ ...buttonStyle, backgroundColor: "#e74c3c" }}
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </>
      )}

      {/* Dar Like */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleLikeToggle}>
          {post.likedBy?.includes(user.username) ? "Quitar Like" : "Dar Like"} ❤️ {post.likedBy?.length || 0}
        </button>
      </div>

      {/* Comentarios */}
      <div style={{ marginTop: "20px" }}>
        <h3>Comentarios</h3>
        {post.comments && post.comments.length > 0 ? (
          <ul>
            {post.comments.map((c, idx) => (
              <li key={idx}>
                <strong>{c.author}:</strong> {c.content}
              </li>
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
        <button onClick={handleAddComment} style={buttonStyle}>
          Agregar Comentario
        </button>
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
