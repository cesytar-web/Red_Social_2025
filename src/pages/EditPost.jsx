import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editPost } from '../redux/postsSlice';

export default function EditPost() {
  const { id } = useParams(); // este es el _id del post
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    state.posts.items.find((p) => p._id === id) // usamos _id en lugar de id
  );

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Por favor completa todos los campos.');
      return;
    }

    // Enviamos los datos al slice
    dispatch(editPost({ _id: post._id, title, content, author: post.author }));

    // Redirigir al detalle del post después de editar
    navigate(`/posts/${post._id}`);
  };

  if (!post) {
    return <p>Publicación no encontrada.</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>Editar Publicación</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        style={inputStyle}
      />
      <br />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenido"
        rows={6}
        style={{ ...inputStyle, height: '120px', marginTop: '10px' }}
      />
      <br />
      <button type="submit" style={buttonStyle}>Guardar Cambios</button>
    </form>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  fontSize: '1rem',
  marginTop: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const buttonStyle = {
  marginTop: '15px',
  padding: '10px 18px',
  backgroundColor: '#3498db',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '1rem',
};
