// src/components/NavBar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function NavBar({ currentUser, setCurrentUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <nav style={navStyle}>
      {/* Inicio */}
      <Link to="/home" style={linkStyle}>
        <button style={{ ...buttonStyle, ...(location.pathname === '/home' ? activeStyle : {}) }}>
          Inicio
        </button>
      </Link>

      {/* Libros */}
      <Link to="/books" style={linkStyle}>
        <button style={{ ...buttonStyle, ...(location.pathname === '/books' ? activeStyle : {}) }}>
          Libros
        </button>
      </Link>

      {/* Mi Perfil */}
      {currentUser && (
        <Link to="/profile" style={linkStyle}>
          <button style={{ ...buttonStyle, ...(location.pathname === '/profile' ? activeStyle : {}) }}>
            Mi Perfil
          </button>
        </Link>
      )}

      {/* Login / Logout */}
      {currentUser ? (
        <button style={buttonStyle} onClick={handleLogout}>Cerrar Sesión</button>
      ) : (
        <Link to="/login" style={linkStyle}>
          <button style={buttonStyle}>Ingresar</button>
        </Link>
      )}
    </nav>
  );
}

// ===== Estilos =====
const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  margin: '30px 0',
};

const buttonStyle = {
  padding: '12px 20px',
  borderRadius: '12px',
  border: 'none',
  fontWeight: 'bold',
  cursor: 'pointer',
  background: 'linear-gradient(135deg, #66bb6a, #a5d6a7)',
  color: 'white',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transition: '0.3s',
};

const activeStyle = {
  background: 'linear-gradient(135deg, #2e7d32, #43a047)',
};

const linkStyle = {
  textDecoration: 'none',
};
