// src/pages/PostDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, deletePost } from '../redux/postsSlice';

export default function PostDetail() {
  const { postId } = useParams(); // Id del post desde la URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.items);
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);

  // Logs de depuración
  console.log('Props/posts recibidos en PostDetail:', posts);
  console.log('postId recibido en URL:', postId);
  console.log('Usuario actual:', user);

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

  // Buscar el post por id (convertimos ambos a número)
  const post = posts.find((p) => Number(p.id) === Number(postId));
  console.log('Post encontrado:', post); // Log para verificar si se encuentra el post

  // Estado de carga
  if (loading) return <p>Cargando publicación...</p>;

  // Mostrar si no se encuentra el post
  if (!post) return <p>Publicación no encontrada.</p>;

  // Función para eliminar post con confirmación
  const handleDelete = () => {
    if (window.confirm('¿Seguro que deseas eliminar esta publicación?')) {
      dispatch(deletePost(post.id));
      navigate('/home');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><i>Autor: {post.author}</i></p>

      {/* Mostrar botones editar y eliminar solo si el usuario es autor */}
      {user?.username === post.author && (
        <>
          <Link to={`/edit-post/${post.id}`}>
            <button style={buttonStyle}>Editar</button>
          </Link>
          <button
            style={{ ...buttonStyle, backgroundColor: '#e74c3c' }}
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </>
      )}

      <hr />
      <Link to="/home">Volver a Inicio</Link>
    </div>
  );
}

const buttonStyle = {
  marginRight: '10px',
  padding: '6px 12px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#3498db',
  color: 'white',
  cursor: 'pointer',
};
