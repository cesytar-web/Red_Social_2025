// src/components/Comments.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, deleteComment } from '../redux/comments/commentsSlice';

export default function Comments({ postId }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const comments = useSelector((state) =>
    state.comments.comments.filter((c) => c.postId === postId)
  );

  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (commentText.trim()) {
      dispatch(
        addComment({
          postId,
          content: commentText,
          author: user?.username || 'Anónimo',
        })
      );
      setCommentText('');
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <h4>Comentarios</h4>
      {comments.map((comment) => (
        <div key={comment.id} style={{ marginBottom: '0.5rem' }}>
          <strong>{comment.author}:</strong> {comment.content}
          {comment.author === user?.username && (
            <button
              onClick={() => dispatch(deleteComment(comment.id))}
              style={{
                marginLeft: '10px',
                background: 'none',
                border: 'none',
                color: 'red',
                cursor: 'pointer',
              }}
            >
              Eliminar
            </button>
          )}
        </div>
      ))}
      {user && (
        <div>
          <input
            type="text"
            value={commentText}
            placeholder="Agregar un comentario..."
            onChange={(e) => setCommentText(e.target.value)}
            style={{ width: '80%', padding: '5px' }}
          />
          <button onClick={handleAddComment}>Enviar</button>
        </div>
      )}
    </div>
  );
}
