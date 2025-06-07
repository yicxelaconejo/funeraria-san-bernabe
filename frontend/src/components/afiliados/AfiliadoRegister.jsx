import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAfiliado } from "../../context/AfiliadoContext";
import { useHeadline } from "../../context/HeadlinesContext";
import { useForm, Controller } from "react-hook-form";

const serviciosOptions = ["Funerario", "Cremación"];

const schema = yup.object().shape({
  nombreAfiliado: yup
    .string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Solo se permiten letras")
    .required("Este campo es requerido"),

  apellidoAfiliado: yup
    .string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Solo se permiten letras")
    .required("Este campo es requerido"),

  tipoDocAfiliado: yup.string().required("Este campo es requerido"),

  documentoAfiliado: yup
    .number()
    .typeError("Debe ser un número")
    .required("Este campo es requerido"),

  correoAfiliado: yup
    .string()
    .email("Correo no válido")
    .required("Este campo es requerido"),

  telefonoAfiliado: yup
    .number()
    .typeError("Debe ser un número")
    .required("Este campo es requerido"),

  direccionAfiliado: yup.string().required("Este campo es requerido"),

  fechaNacimientoAfiliado: yup.string().required("Este campo es requerido"),

  fechaAfiliacionAfiliado: yup.string().required("Este campo es requerido"),

  fechaVenAfiliado: yup.string().required("Este campo es requerido"),

  serviciosAfiliado: yup
    .array()
    .min(1, "Selecciona al menos un servicio")
    .required("Este campo es requerido"),
});

export default function AfiliadoRegister() {
  const { id, afiliadoId } = useParams();
  const navigate = useNavigate();

  // Usar las funciones correctas del contexto Afiliado
  const { createAfiliado, getAfiliadoId, updateAfiliadoId } = useAfiliado();

  const { getHeadlineById } = useHeadline();
  const [titularNombre, setTitularNombre] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Obtener datos del titular para mostrar en el título
  useEffect(() => {
    async function fetchTitular() {
      console.log("id del titular:", id);
      if (id) {
        const titularData = await getHeadlineById(id);
        if (titularData) {
          setTitularNombre(titularData.nombreTitular || "");
        }
      }
      console.log("titularData:", titularData);
    }
    fetchTitular();
  }, [id, getHeadlineById]);

  // Obtener datos del afiliado cuando haya afiliadoId para edición
  useEffect(() => {
    async function fetchAfiliado() {
      if (afiliadoId) {
        const data = await getAfiliadoId(afiliadoId);
        if (data) {
          reset({
            ...data,
            fechaNacimientoAfiliado: data.fechaNacimientoAfiliado?.slice(0, 10),
            fechaAfiliacionAfiliado: data.fechaAfiliacionAfiliado?.slice(0, 10),
            fechaVenAfiliado: data.fechaVenAfiliado?.slice(0, 10),
          });
        }
      }
    }
    fetchAfiliado();
  }, [afiliadoId, reset, getAfiliadoId]);

  // Enviar formulario
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (afiliadoId) {
        await updateAfiliadoId(afiliadoId, data);
      } else {
        await createAfiliado({
          ...data,
          perteneceTitular: id,
          estadoAfiliado: true,
        });
      }
      navigate(`/titulares/${id}/afiliados`);
    } catch (error) {
      console.error("Error al guardar afiliado:", error);
      if (error.response) {
        console.error("Respuesta error del servidor:", error.response.data);
      }
      alert("Hubo un error al guardar el afiliado.");
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
        {afiliadoId
          ? `Editar Afiliado`
          : `Registrar Afiliado`}
      </Typography>

      <form onSubmit={onSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Nombre del Afiliado"
              {...register("nombreAfiliado")}
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
              {...register("apellidoAfiliado")}
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
              {...register("tipoDocAfiliado")}
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
              {...register("documentoAfiliado", { valueAsNumber: true })}
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
              {...register("correoAfiliado")}
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
              {...register("telefonoAfiliado", { valueAsNumber: true })}
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
              {...register("direccionAfiliado")}
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
              {...register("fechaNacimientoAfiliado")}
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
              {...register("fechaAfiliacionAfiliado")}
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
              {...register("fechaVenAfiliado")}
              error={!!errors.fechaVenAfiliado}
              helperText={errors.fechaVenAfiliado?.message}
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderColor: "#0097B2" } }}
            />
          </Grid>

          {/* Campo con selección múltiple */}
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="serviciosAfiliado"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  fullWidth
                  label="Servicios"
                  SelectProps={{
                    multiple: true,
                    value: field.value || [],
                    onChange: field.onChange,
                  }}
                  error={!!errors.serviciosAfiliado}
                  helperText={errors.serviciosAfiliado?.message}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={{ "& fieldset": { borderColor: "#0097B2" } }}
                >
                  {serviciosOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                backgroundColor: "#00A5BD",
                borderRadius: 4,
                fontSize: 16,
                "&:hover": {
                  backgroundColor: "#00879E",
                },
              }}
            >
              {afiliadoId ? "Actualizar Afiliado" : "Registrar Afiliado"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
