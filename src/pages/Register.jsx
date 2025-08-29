import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register({ setCurrentUser }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Registro
      await axios.post('http://localhost:8080/users/register', form);

      // Login automático después del registro
      const response = await axios.post('http://localhost:8080/users/login', {
        email: form.email,
        password: form.password
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      // Guardar usuario en estado global
      setCurrentUser({ username: form.name, email: form.email, token });

      navigate('/home'); // Redirige al Home
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Error en el registro';
      setError(message);
      console.error('Error al registrar usuario:', err.response || err);
    }
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
      <p style={{ marginTop: '20px' }}>
        ¿Ya tienes cuenta? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/login')}>Inicia sesión aquí</span>
      </p>
    </div>
  );
}
