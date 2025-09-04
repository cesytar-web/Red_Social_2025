// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NavBar from "./components/NavBar.jsx";
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost.jsx';

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    username: "Cecilia",
    email: "cecilia@example.com",
  });

  const [posts, setPosts] = useState([
    { id: 1, title: "Primer post", content: "Contenido del primer post", author: "Cecilia", likedBy: [] },
    { id: 2, title: "Segundo post", content: "Contenido del segundo post", author: "Juan", likedBy: [] },
  ]);

  const [users, setUsers] = useState([
    { username: "Cecilia", email: "cecilia@example.com" },
    { username: "Juan", email: "juan@example.com" },
    { username: "Pedro", email: "pedro@example.com" },
  ]);

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

        {/* Ruta para detalle del post */}
        <Route path="/posts/:postId" element={<PostDetail />} />

        {/* Ruta para editar post */}
        <Route path="/edit-post/:id" element={<EditPost />} />

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
