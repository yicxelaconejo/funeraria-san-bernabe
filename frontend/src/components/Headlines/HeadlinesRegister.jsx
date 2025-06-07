import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { useHeadline } from "../../context/HeadlinesContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function HeadlineFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const { createHeadline, getHeadlineid, updateHeadlineId } = useHeadline();
  const navigate = useNavigate();
  const params = useParams();
  const fechaAfiliacion = watch("fechaAfiliacion");

  // Lista de direcciones válidas para autocompletar dirección (opcional)
  const direccionesValidas = [
    { label: "Calle 5 # 4-19, Popayán", value: "Calle 5 # 4-19, Popayán" },
    { label: "Carrera 9 # 6-27, Popayán", value: "Carrera 9 # 6-27, Popayán" },
    { label: "Carrera 6 # 8-15, Popayán", value: "Carrera 6 # 8-15, Popayán" },
    { label: "Calle 12 # 5-33, Popayán", value: "Calle 12 # 5-33, Popayán" },
    { label: "Vereda El Cajete", value: "Vereda El Cajete" },
    { label: "Vereda El Cajete, sector La Linda", value: "Vereda El Cajete, sector La Linda" },
    { label: "Vereda El Cajete, finca La Esperanza", value: "Vereda El Cajete, finca La Esperanza" },
    { label: "Vereda El Cajete, zona rural", value: "Vereda El Cajete, zona rural" },
  ];

  useEffect(() => {
    async function loadHeadline() {
      if (params.id) {
        const headlin = await getHeadlineid(params.id);

        const formatDate = (date) => {
          if (!date) return "";
          const d = new Date(date);
          if (isNaN(d)) return "";
          return d.toISOString().split("T")[0];
        };

        for (const key in headlin) {
          if (headlin.hasOwnProperty(key)) {
            let value = headlin[key];
            if (
              key === "fechaNacimientoTitular" ||
              key === "fechaAfiliacion" ||
              key === "fechaVencimiento"
            ) {
              value = formatDate(value);
            }
            setValue(key, value);
          }
        }
      }
    }
    loadHeadline();
  }, [params.id, setValue]);

  // Para sincronizar dirección válida con campo direcciónTitular
  const direccionSeleccionada = watch("direccionValida");
  useEffect(() => {
    if (direccionSeleccionada) {
      setValue("direccionTitular", direccionSeleccionada);
    }
  }, [direccionSeleccionada, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (params.id) {
        await updateHeadlineId(params.id, data);
      } else {
        await createHeadline(data);
      }
      navigate("/headlines");
    } catch (error) {
      console.error("Error guardando titular:", error);
      alert("Hubo un error al guardar el titular.");
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
          onClick={() => navigate("/headlines")}
          sx={{
            backgroundColor: "#00A5BD",
            color: "#fff",
            "&:hover": { backgroundColor: "#00879E" },
          }}
          aria-label="Cerrar formulario"
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
        Registrar Titular
      </Typography>

      <form onSubmit={onSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Nombre del Usuario"
              placeholder="Nombre Completo"
              {...register("nombreTitular", { required: "Este campo es requerido",
                pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                message: "Solo se permiten letras"
              }
              })}
              error={!!errors.nombreTitular}
              helperText={errors.nombreTitular?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Apellido del Usuario"
              placeholder="Apellidos"
              {...register("apellidoTitular", { required: "Este campo es requerido",
                pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                message: "Solo se permiten letras"
              }
               })}
              error={!!errors.apellidoTitular}
              helperText={errors.apellidoTitular?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="Tipo Documento"
              {...register("tipoDocTitular", { required: "Este campo es requerido" })}
              error={!!errors.tipoDocTitular}
              helperText={errors.tipoDocTitular?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            >
              <MenuItem value="CC">Cédula</MenuItem>
              <MenuItem value="TI">Tarjeta de Identidad</MenuItem>
              <MenuItem value="CE">Cédula Extranjería</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Documento"
              type="number"
              {...register("documentoTitular", {
                required: "Este campo es requerido",
                valueAsNumber: true,
              })}
              error={!!errors.documentoTitular}
              helperText={errors.documentoTitular?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register("correoTitular", { required: "Este campo es requerido",
                pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Debe ser un correo válido"
              }
               })}
              error={!!errors.correoTitular}
              helperText={errors.correoTitular?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          {/* Select para elegir dirección válida */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="Dirección válida"
              {...register("direccionValida")}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            >
              {direccionesValidas.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Campo Dirección que se autocompleta con selección de dirección válida */}
          {/* <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Dirección"
              {...register("direccionTitular", { required: "Este campo es requerido" })}
              error={!!errors.direccionTitular}
              helperText={errors.direccionTitular?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid> */}

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="tel"
              label="Número de Teléfono"
              {...register("telefonoTitular", {
                required: "Este campo es requerido",
                valueAsNumber: true,
                pattern: {
                value: /^[0-9]+$/,
                message: "Solo se permiten números"
              }
              })}
              error={!!errors.telefonoTitular}
              helperText={errors.telefonoTitular?.message}
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
              {...register("fechaNacimientoTitular", { required: "Este campo es requerido" })}
              error={!!errors.fechaNacimientoTitular}
              helperText={errors.fechaNacimientoTitular?.message}
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Afiliación"
              {...register("fechaAfiliacion", { required: "Este campo es requerido" })}
              error={!!errors.fechaAfiliacion}
              helperText={errors.fechaAfiliacion?.message}
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Vencimiento"
                {...register("fechaVencimiento", {
                  required: "Este campo es requerido",
                  validate: value =>
                    fechaAfiliacion && value <= fechaAfiliacion
                      ? "La fecha de vencimiento debe ser mayor a la fecha de afiliación"
                      : true,
                })}
              error={!!errors.fechaVencimiento}
              helperText={errors.fechaVencimiento?.message}
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="Servicios"
              {...register("servicios", { required: "Este campo es requerido" })}
              error={!!errors.servicios}
              helperText={errors.servicios?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            >
              <MenuItem value="Funerario">Funerario</MenuItem>
              <MenuItem value="Cremación">Cremación</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="Zona"
              {...register("zonaTitular", { required: "Este campo es requerido" })}
              error={!!errors.zonaTitular}
              helperText={errors.zonaTitular?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            >
              <MenuItem value="Zona 1">Zona 1</MenuItem>
              <MenuItem value="Zona 2">Zona 2</MenuItem>
              <MenuItem value="Zona 3">Zona 3</MenuItem>
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
              Registrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default HeadlineFormPage;
