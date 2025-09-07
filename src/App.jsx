// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NavBar from "./components/NavBar.jsx";
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost.jsx';
import EditBookForm from './components/EditBookForm';

import BooksList from './pages/BooksList.jsx';      // Página que lista libros desde redux
import AddBookForm from './components/AddBookForm'; // Formulario para agregar libros

export default function App() {
  // Aquí puedes quitar los estados locales de posts, users, currentUser si ya usas redux para eso

  return (
    <>
      <NavBar
        // Si usas redux para currentUser, pasa como prop lo que tengas o quítalo
      />

      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />
        
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/posts/:postId" element={<PostDetail />} />

        <Route path="/edit-post/:id" element={<EditPost />} />

        {/* Ruta para mostrar lista de libros */}
        <Route path="/books" element={<BooksList />} />

        {/* Ruta para agregar un nuevo libro */}
        <Route path="/books/add" element={<AddBookForm />} />

        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/edit-book/:id" element={<EditBookForm />} />
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
