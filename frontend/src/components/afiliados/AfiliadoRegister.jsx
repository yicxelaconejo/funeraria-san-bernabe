import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAfiliado } from "../../context/AfiliadoContext";
import { useHeadline } from "../../context/HeadlinesContext";
import { useForm } from "react-hook-form";

export default function AfiliadoRegister() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createAfiliado } = useAfiliado();
  const { getHeadlineById } = useHeadline();
  const [titularNombre, setTitularNombre] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchTitular() {
      const titular = await getHeadlineById(id);
      if (titular) {
        setTitularNombre(`${titular.nombreTitular} ${titular.apellidoTitular}`);
      }
    }
    fetchTitular();
  }, [id]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createAfiliado({ ...data, perteneceTitular: id, estadoAfiliado: true });
      navigate("/afiliados");
    } catch (error) {
      console.error("Error al registrar afiliado:", error);
      alert("Hubo un error al registrar el afiliado.");
    }
  });

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 4,
        p: 5,
        border: "2px solid #0097B2",
        borderRadius: 2,
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <IconButton
          onClick={() => navigate(`/titulares/${id}/afiliados`)}
          sx={{
            backgroundColor: "#00A5BD",
            color: "#fff",
            "&:hover": { backgroundColor: "#00879E" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#333", fontWeight: 700, mb: 4 }}
      >
        Registrar Afiliado de {titularNombre}
      </Typography>

      <form onSubmit={onSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Nombre del Afiliado"
              {...register("nombreAfiliado", { required: "Este campo es requerido" })}
              error={!!errors.nombreAfiliado}
              helperText={errors.nombreAfiliado?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Apellido del Afiliado"
              {...register("apellidoAfiliado", { required: "Este campo es requerido" })}
              error={!!errors.apellidoAfiliado}
              helperText={errors.apellidoAfiliado?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="Tipo de Documento"
              {...register("tipoDocAfiliado", { required: "Este campo es requerido" })}
              error={!!errors.tipoDocAfiliado}
              helperText={errors.tipoDocAfiliado?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            >
              <MenuItem value="CC">Cédula</MenuItem>
              <MenuItem value="TI">Tarjeta de Identidad</MenuItem>
              <MenuItem value="CE">Cédula de Extranjería</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Número de Documento"
              type="number"
              {...register("documentoAfiliado", {
                required: "Este campo es requerido",
                valueAsNumber: true,
              })}
              error={!!errors.documentoAfiliado}
              helperText={errors.documentoAfiliado?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="email"
              label="Correo Electrónico"
              {...register("correoAfiliado", { required: "Este campo es requerido" })}
              error={!!errors.correoAfiliado}
              helperText={errors.correoAfiliado?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="tel"
              label="Teléfono"
              {...register("telefonoAfiliado", {
                required: "Este campo es requerido",
                valueAsNumber: true,
              })}
              error={!!errors.telefonoAfiliado}
              helperText={errors.telefonoAfiliado?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Dirección"
              {...register("direccionAfiliado", { required: "Este campo es requerido" })}
              error={!!errors.direccionAfiliado}
              helperText={errors.direccionAfiliado?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Nacimiento"
              {...register("fechaNacimientoAfiliado", { required: "Este campo es requerido" })}
              error={!!errors.fechaNacimientoAfiliado}
              helperText={errors.fechaNacimientoAfiliado?.message}
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Afiliación"
              {...register("fechaAfiliacionAfiliado", { required: "Este campo es requerido" })}
              error={!!errors.fechaAfiliacionAfiliado}
              helperText={errors.fechaAfiliacionAfiliado?.message}
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Vencimiento"
              {...register("fechaVenAfiliado", { required: "Este campo es requerido" })}
              error={!!errors.fechaVenAfiliado}
              helperText={errors.fechaVenAfiliado?.message}
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="Servicios"
              {...register("serviciosAfiliado", { required: "Este campo es requerido" })}
              error={!!errors.serviciosAfiliado}
              helperText={errors.serviciosAfiliado?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            >
              <MenuItem value="Funerario">Funerario</MenuItem>
              <MenuItem value="Cremación">Cremación</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#0097B2",
                color: "#fff",
                fontWeight: 600,
                height: 48,
              }}
            >
              Registrar Afiliado
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
