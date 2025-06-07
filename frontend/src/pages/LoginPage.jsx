import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/logo.png";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./LoginPage.css";

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/headlines");
  }, [isAuthenticated]);

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <img src={logo} alt="Logo" className="login-logo" />

        {signinErrors.map((error, i) => (
          <div className="login-error-banner" key={i}>
            {error}
          </div>
        ))}

        <h1 className="login-title">Iniciar sesión</h1>

        <form onSubmit={onSubmit}>
          <div className="login-input-group">
            <FaEnvelope className="login-icon" />
            <input
              type="email"
              {...register("email", { required: true })}
              className="login-input"
              placeholder="Correo electrónico"
            />
          </div>
          {errors.email && <p className="login-error">El correo es requerido</p>}

          <div className="login-input-group">
            <FaLock className="login-icon" />
            <input
              type="password"
              {...register("password", { required: true })}
              className="login-input"
              placeholder="Contraseña"
            />
          </div>
          {errors.password && <p className="login-error">La contraseña es requerida</p>}

          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>

        <p className="login-footer">
          ¿No tienes una cuenta?
          <Link to="/register" className="login-link">
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
