import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, deletePost } from '../redux/postsSlice';
import { Link } from 'react-router-dom';
import Comments from '../components/Comments';

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (postId) => {
    if (window.confirm('¿Estás seguro que deseas eliminar esta publicación?')) {
      dispatch(deletePost(postId));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Publicaciones</h2>
      {posts.length === 0 ? (
        <p>No hay publicaciones todavía.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={postCardStyle}>
            <h3>
              <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {post.title}
              </Link>
            </h3>
            <p>{post.content}</p>
            <p style={{ fontStyle: 'italic' }}>Autor: {post.author}</p>

            {user?.username === post.author && (
              <div>
                <Link to={`/edit-post/${post.id}`}>
                  <button style={buttonStyle}>Editar</button>
                </Link>
                <button
                  style={{ ...buttonStyle, backgroundColor: '#e74c3c' }}
                  onClick={() => handleDelete(post.id)}
                >
                  Eliminar
                </button>
              </div>
            )}

            {/* Comentarios */}
            <Comments postId={post.id} />
          </div>
        ))
      )}
    </div>
  );
}

const postCardStyle = {
  border: '1px solid #ccc',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '15px',
  backgroundColor: '#f9f9f9',
};

const buttonStyle = {
  marginRight: '10px',
  padding: '6px 12px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#3498db',
  color: 'white',
  cursor: 'pointer',
};
