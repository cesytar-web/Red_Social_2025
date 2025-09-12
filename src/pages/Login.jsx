// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Login para obtener token
      const response = await axios.post('http://localhost:8080/users/login', form);
      const { token } = response.data;

      // Obtener perfil completo del usuario logueado
      const profileResponse = await axios.get('http://localhost:8080/users/getProfile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = profileResponse.data.user; // Aseguramos que usamos .user
      dispatch(setCurrentUser({ ...user, token }));
      localStorage.setItem('token', token);

      alert(`¡Bienvenido ${user.name}!`); // Ahora mostrará el nombre correcto
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Email o contraseña incorrectos');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login de Usuario</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Ingresar</button>
      </form>
      <p style={{ marginTop: '20px' }}>
        ¿No tienes cuenta?{' '}
        <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}
