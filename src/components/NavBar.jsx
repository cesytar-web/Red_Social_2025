// src/components/NavBar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavBar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Limpiar el usuario actual
    setCurrentUser(null);
    // Redirigir a login
    navigate('/login');
  };

  return (
    <nav>
      <button
        className={location.pathname === '/home' ? 'active' : ''}
        onClick={() => navigate('/home')}
      >
        Inicio
      </button>

      {/* Mostrar "Mi Perfil" solo si hay usuario */}
      {currentUser && (
        <button
          className={location.pathname === '/profile' ? 'active' : ''}
          onClick={() => navigate('/profile')}
        >
          Mi Perfil
        </button>
      )}

      {/* Mostrar botón según estado de sesión */}
      {currentUser ? (
        <button onClick={handleLogout}>Cerrar Sesión</button>
      ) : (
        <button onClick={() => navigate('/login')}>Ingresar</button>
      )}
    </nav>
  );
}
