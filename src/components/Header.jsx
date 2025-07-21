// src/components/Header.jsx
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Registro</Link></li>
        </ul>
      </nav>
    </header>
  )
}
