import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
} from "@mui/material";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/headlines");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        bgcolor: "#ffffff", // Fondo blanco
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {RegisterErrors.map((error, i) => (
        <Alert key={i} severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ))}

      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3} color="text.primary">
        Registrar Usuario
      </Typography>

      <form onSubmit={onSubmit} noValidate>
        <TextField
          fullWidth
          label="Nombre de usuario"
          variant="filled"
          InputProps={{ disableUnderline: true }}
          sx={{ mb: 2, bgcolor: "#f3f4f6" }}
          {...register("username", { required: true })}
          error={!!errors.username}
          helperText={errors.username && "Username es requerido"}
        />

        <TextField
          fullWidth
          label="Correo electrónico"
          variant="filled"
          InputProps={{ disableUnderline: true }}
          sx={{ mb: 2, bgcolor: "#f3f4f6" }}
          {...register("email", { required: true })}
          error={!!errors.email}
          helperText={errors.email && "Email es requerido"}
        />

        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          variant="filled"
          InputProps={{ disableUnderline: true }}
          sx={{ mb: 2, bgcolor: "#f3f4f6" }}
          {...register("password", { required: true })}
          error={!!errors.password}
          helperText={errors.password && "Password es requerido"}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "#0097B2",
            ":hover": { bgcolor: "#007c93" },
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          Registrar
        </Button>
      </form>

      <Typography mt={3} textAlign="center" color="text.secondary">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" style={{ color: "#0097B2", fontWeight: "bold" }}>
          Iniciar sesión
        </Link>
      </Typography>
    </Box>
  );
}

export default RegisterPage;
