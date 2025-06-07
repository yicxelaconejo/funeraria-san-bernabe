import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png"; // Asegúrate de que la ruta sea correcta
import './Navbar.css'; // Archivo de estilos

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar__logo">
        <Link to={isAuthenticated ? "/headlines" : "/"}>
          <img src={logo} alt="San Bernabé Funeraria" />
        </Link>
      </div>

      {/* Menú principal */}
      <ul className="navbar__menu">
        {/* Mostrar solo si NO ha iniciado sesión */}
        {!isAuthenticated && (
          <>
            <li>
              <a href="#quienes-somos">Quiénes Somos</a>
            </li>
            <li>
              <a href="#servicios">Servicios</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>
          </>
        )}

        {/* Mostrar si está autenticado */}
        {isAuthenticated ? (
          <>
            <li className="navbar__welcome"> {user.username}</li>
            <li>
              <Link to="/" onClick={logout}>Cerrar sesión</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="navbar__button">Entrar</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
