// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NavBar from "./components/NavBar.jsx";

export default function App() {
  // Estado del usuario actual
  const [currentUser, setCurrentUser] = useState({
    username: "Cecilia",
    email: "cecilia@example.com"
  });

  // Estado de posts
  const [posts, setPosts] = useState([
    { id: 1, title: "Primer post", content: "Contenido del primer post", author: "Cecilia", likedBy: [] },
    { id: 2, title: "Segundo post", content: "Contenido del segundo post", author: "Juan", likedBy: [] }
  ]);

  // Lista de usuarios (estado global para poder agregar nuevos)
  const [users, setUsers] = useState([
    { username: "Cecilia", email: "cecilia@example.com" },
    { username: "Juan", email: "juan@example.com" },
    { username: "Pedro", email: "pedro@example.com" }
  ]);

  return (
    <>
      {/* NavBar recibe props para manejar la sesión y la búsqueda */}
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
              users={users}        // Lista global de usuarios
              currentUser={currentUser?.username}
            />
          }
        />

        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />

        {/* Pasamos setUsers a Register para que pueda actualizar la lista */}
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

        {/* Redirigir la raíz a /home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Ruta 404 */}
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
