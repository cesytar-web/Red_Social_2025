// src/components/AddPost.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function AddPost({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (!currentUser) {
      alert("Debes estar logueado para agregar una publicación.");
      return;
    }

    // Crear post localmente
    const newPost = {
      id: Date.now(),
      title,
      content,
      author: currentUser.name,
      likedBy: [],
    };

    onAdd(newPost);

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-post-form" style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ width: "100%", padding: "8px", marginBottom: "8px", boxSizing: "border-box" }}
      />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        required
        style={{ width: "100%", padding: "8px", marginBottom: "8px", boxSizing: "border-box" }}
      />
      <button type="submit" style={{ padding: "10px 20px", fontWeight: "bold" }}>
        Agregar publicación
      </button>
    </form>
  );
}
