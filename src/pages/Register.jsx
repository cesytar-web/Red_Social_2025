import React, { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: 'test@test.com',
    password: '123456'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // Guardar usuario en localStorage (simulando base de datos)
  localStorage.setItem('user', JSON.stringify(form));

  console.log('Usuario registrado:', form);
  alert('Usuario registrado con éxito');

  // Opcional: redirigir al login
  // window.location.href = '/login'; 
};

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={handleChange}
          required
        />
        <br />
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
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
