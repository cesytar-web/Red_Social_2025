// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register({ setCurrentUser, setUserList }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de registro exitoso (sin backend)
    const newUser = {
      username: form.name,
      email: form.email
    };

    // Guardar usuario actual
    setCurrentUser(newUser);

    // Agregar a la lista global de usuarios
    setUserList(prev => {
      console.log("🟡 Usuarios antes de agregar:", prev);
      const updated = [...prev, newUser];
      console.log("🟢 Lista de usuarios actualizada:", updated);
      return updated;
    });

    // Redirigir al Home
    navigate('/home');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Registro de Usuario</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre de usuario"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
