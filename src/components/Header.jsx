// src/components/Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authSlice'; // Asegúrate de que esta acción exista

export default function Header() {
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '10px', padding: 0 }}>
          <li><Link to="/">Inicio</Link></li>

          {!currentUser ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Registro</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/profile">Mi perfil ({currentUser.username})</Link></li>
              <li><button onClick={handleLogout}>Cerrar sesión</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
