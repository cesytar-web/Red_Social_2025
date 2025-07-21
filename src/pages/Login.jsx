import React, { useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({
    email: 'test@test.com',
    password: '123456'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (!savedUser) {
      alert('No hay usuarios registrados. Por favor, regístrate primero.');
      return;
    }

    if (form.email === savedUser.email && form.password === savedUser.password) {
      alert(`¡Bienvenido ${savedUser.username}! Has iniciado sesión correctamente.`);
      // Aquí podrías redirigir o guardar estado de sesión, por ejemplo:
      // localStorage.setItem('isLoggedIn', 'true');
      // window.location.href = '/'; // o a perfil
    } else {
      alert('Email o contraseña incorrectos.');
    }
  };

  return (
    <div>
      <h1>Login de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
