// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NavBar from "./components/NavBar.jsx";
import PostDetail from './pages/PostDetail';

export default function App() {
  // Estado del usuario actual
  const [currentUser, setCurrentUser] = useState({
    username: "Cecilia",
    email: "cecilia@example.com",
  });

  // Estado de posts
  const [posts, setPosts] = useState([
    { id: 1, title: "Primer post", content: "Contenido del primer post", author: "Cecilia", likedBy: [] },
    { id: 2, title: "Segundo post", content: "Contenido del segundo post", author: "Juan", likedBy: [] },
  ]);

  // Lista de usuarios
  const [users, setUsers] = useState([
    { username: "Cecilia", email: "cecilia@example.com" },
    { username: "Juan", email: "juan@example.com" },
    { username: "Pedro", email: "pedro@example.com" },
  ]);

  // Exponer estados al window para pruebas desde la consola
  useEffect(() => {
    window.users = users;
    window.setUsers = setUsers;
    window.posts = posts;
    window.setPosts = setPosts;
  }, [users, posts]);

  return (
    <>
      <NavBar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        posts={posts}
        users={users}
      />

      <Routes>
        <Route
          path="/home"
          element={
            <Home
              posts={posts}
              setPosts={setPosts}
              users={users}
              currentUser={currentUser?.username}
            />
          }
        />

        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        
        <Route
          path="/register"
          element={<Register setCurrentUser={setCurrentUser} setUserList={setUsers} />}
        />

        <Route
          path="/profile"
          element={
            <Profile
              posts={posts}
              setPosts={setPosts}
              currentUser={currentUser}
            />
          }
        />

        {/* RUTA AGREGADA: Detalle del post */}
        <Route
          path="/posts/:postId"
          element={<PostDetail />}
        />

        <Route path="/" element={<Navigate to="/home" />} />

        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
              404 - Página no encontrada
            </h2>
          }
        />
      </Routes>
    </>
  );
}
