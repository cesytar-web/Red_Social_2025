import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
import Profile from './pages/Profile';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost'; // Verifica que exista el archivo y ruta correcta

export default function App() {
  // Simula usuario logueado
  const currentUser = { username: 'Cecilia', email: 'test@test.com' };

  // Simula publicaciones existentes
  const [posts, setPosts] = useState([
    { id: 1, title: 'Primer post', content: 'Este es el contenido del primer post.', author: 'Cecilia' },
    { id: 2, title: 'Segundo post', content: 'Aquí va el contenido del segundo post.', author: 'Juan' },
  ]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home posts={posts} setPosts={setPosts} currentUser={currentUser} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={<Profile currentUser={currentUser} posts={posts} />}
        />
        <Route path="/edit-post/:postId" element={<EditPost />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
      </Routes>
    </>
  );
}
