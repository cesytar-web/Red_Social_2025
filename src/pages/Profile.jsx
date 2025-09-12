// src/pages/Profile.jsx
import React from 'react';
import AddPost from '../components/AddPost';
import '../index.scss';

export default function Profile({ currentUser, posts, setPosts }) {
  if (!currentUser) {
    return <p className="no-posts">Debes iniciar sesión para ver tu perfil.</p>;
  }

  // Filtrar solo los posts del usuario logueado
  const userPosts = posts.filter(post => post.author === (currentUser.username || "Sin nombre"));

  // Función para agregar nuevas publicaciones
  const handleAddPost = (newPost) => {
    const postWithId = {
      id: Date.now(), // ID único temporal
      author: currentUser.username || "Sin nombre",
      likedBy: [],
      ...newPost,
    };
    setPosts([postWithId, ...posts]);
  };

  // Función para dar/Quitar like
  const handleLikeToggle = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const hasLiked = post.likedBy.includes(currentUser.username || "Sin nombre");
          const updatedLikes = hasLiked
            ? post.likedBy.filter(user => user !== (currentUser.username || "Sin nombre"))
            : [...post.likedBy, currentUser.username || "Sin nombre"];
          return { ...post, likedBy: updatedLikes };
        }
        return post;
      })
    );
  };

  // Función para editar post
  const handleEdit = (postId) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const newTitle = prompt('Nuevo título:', post.title);
    const newContent = prompt('Nuevo contenido:', post.content);
    if (newTitle && newContent) {
      setPosts(prevPosts =>
        prevPosts.map(p =>
          p.id === postId ? { ...p, title: newTitle, content: newContent } : p
        )
      );
    }
  };

  // Función para eliminar post
  const handleDelete = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  return (
    <div className="profile-container">
      <h2>Perfil de {currentUser.username || "Sin nombre"}</h2>
      <p>Email: {currentUser.email}</p>

      <AddPost onAdd={handleAddPost} />

      <h3>Tus publicaciones</h3>
      {userPosts.length === 0 ? (
        <p className="no-posts">No has publicado nada aún.</p>
      ) : (
        userPosts.map(post => (
          <div key={post.id} className="post-card">
            <h4>{post.title || "Sin título"}</h4>
            <p>{post.content || "Sin contenido"}</p>
            <p><strong>Autor:</strong> {post.author || "Sin nombre"}</p>
            <button onClick={() => handleLikeToggle(post.id)}>
              {post.likedBy.includes(currentUser.username || "Sin nombre") ? 'Quitar Like' : 'Dar Like'} ❤️ {post.likedBy.length}
            </button>
            <button onClick={() => handleEdit(post.id)}>Editar</button>
            <button onClick={() => handleDelete(post.id)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
}
