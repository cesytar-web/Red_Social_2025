import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ setCurrentUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
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
      // Login y obtener token
      const response = await axios.post('http://localhost:8080/users/login', form);
      const token = response.data.token;

      // Guardar token en localStorage
      localStorage.setItem('token', token);

      // Obtener datos reales del usuario con el token
      const profileResponse = await axios.get('http://localhost:8080/users/getProfile', {
        headers: { Authorization: token }
      });

      // Guardar usuario real en estado global
      setCurrentUser({
        username: profileResponse.data.name,
        email: profileResponse.data.email,
        token
      });

      navigate('/home'); // redirigir al home
    } catch (err) {
      const message = err.response?.data?.message || 'Email o contraseña incorrectos';
      setError(message);
      console.error('Error en login:', err.response || err);
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
        ¿No tienes cuenta? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/register')}>Regístrate aquí</span>
      </p>
    </div>
  );
}
