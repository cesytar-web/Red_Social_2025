// src/components/NavBar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para saber la ruta actual

  return (
    <nav>
      <button
        className={location.pathname === '/home' ? 'active' : ''}
        onClick={() => navigate('/home')}
      >
        Inicio
      </button>
      <button
        className={location.pathname === '/profile' ? 'active' : ''}
        onClick={() => navigate('/profile')}
      >
        Mi Perfil
      </button>
      <button onClick={() => navigate('/login')}>Cerrar Sesión</button>
    </nav>
  );
}
