// src/pages/PostDetail.jsx
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, deletePost } from '../redux/postsSlice';

export default function PostDetail() {
  const { postId } = useParams(); // Usamos postId para que coincida con la ruta
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtenemos posts y usuario desde el store
  const posts = useSelector(state => state.posts.items);
  const user = useSelector(state => state.auth.user);

  // Si no hay posts cargados, los traemos
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  // Encontrar el post por id (aseguramos que sea número)
  const post = posts.find(p => p.id === Number(postId));

  // Si no existe el post, mostrar mensaje
  if (!post) {
    return <p>Publicación no encontrada.</p>;
  }

  // Función para eliminar post con confirmación
  const handleDelete = () => {
    if (window.confirm('¿Seguro que deseas eliminar esta publicación?')) {
      dispatch(deletePost(post.id));
      navigate('/');
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
      <Link to="/">Volver a Inicio</Link>
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
