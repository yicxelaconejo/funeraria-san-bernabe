import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  IconButton,
  Button,
  Box,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PersonIcon from "@mui/icons-material/Person";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAfiliado } from "../../context/AfiliadoContext";

export default function DetallesAfiliado() {
  const { id } = useParams();
  const { getAfiliadoId } = useAfiliado();
  const navigate = useNavigate();

  const [idTitular, setIdTitular] = useState("");

  const defaultValues = {
    nombreAfiliado: "",
    apellidoAfiliado: "",
    tipoDocAfiliado: "",
    documentoAfiliado: "",
    correoAfiliado: "",
    telefonoAfiliado: "",
    direccionAfiliado: "",
    perteneceTitular: "",
    fechaNacimientoAfiliado: "",
    fechaAfiliacionAfiliado: "",
    fechaVenAfiliado: "",
    estadoAfiliado: "",
  };

  const { control, reset, getValues } = useForm({ defaultValues });

  useEffect(() => {
    const fetchAfiliado = async () => {
      if (!id) return;
      const data = await getAfiliadoId(id);
      console.log("Afiliado cargado:", data);
      if (!data) return;

      const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        if (isNaN(d)) return "";
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
      };

      reset({
        ...data,
        perteneceTitular: data.perteneceTitular?._id ?? "",
        fechaNacimientoAfiliado: formatDate(data.fechaNacimientoAfiliado),
        fechaAfiliacionAfiliado: formatDate(data.fechaAfiliacionAfiliado),
        fechaVenAfiliado: formatDate(data.fechaVenAfiliado),
       
        

      });
      setIdTitular(data.perteneceTitular?._id ?? ""); // Guardamos el ID del titular
    };

    fetchAfiliado();
  }, [id, getAfiliadoId, reset]);

  const handleWhatsApp = () => {
    const { telefonoAfiliado, nombreAfiliado } = getValues();
    if (!telefonoAfiliado) return;

    const mensaje = `Hola ${nombreAfiliado}, te saludamos desde Funeraria San Bernabé. ¡Gracias por confiar en nuestros servicios!`;
    const url = `https://wa.me/${telefonoAfiliado}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <Paper
      sx={{
        p: 7,
        position: "relative",
        borderRadius: 3,
        maxWidth: 1000,
        mx: "auto",
        mt: 2,
        border: "2px solid #0097B2",
        color: "black",
      }}
    >
      {/* Botón cerrar */}
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <IconButton
          onClick={() => navigate(`/titulares/${id}/afiliados`)}
          sx={{
            backgroundColor: "#00A5BD",
            color: "#fff",
            "&:hover": { backgroundColor: "#00879E" },
          }}
          disabled={!idTitular} // se desactiva hasta que haya un ID
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Título */}
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        fontWeight="bold"
        color="black"
      >
        Detalles del Afiliado
      </Typography>

      {/* Datos principales */}
      <Box mt={4}>
        <Grid container spacing={2}>
          {[
            { name: "nombreAfiliado", label: "Nombre" },
            { name: "apellidoAfiliado", label: "Apellido" },
            { name: "tipoDocAfiliado", label: "Tipo Documento" },
            { name: "documentoAfiliado", label: "Documento" },
            { name: "correoAfiliado", label: "Correo" },
            { name: "telefonoAfiliado", label: "Teléfono" },
            { name: "direccionAfiliado", label: "Dirección" },
            { name: "perteneceTitular", label: "ID Titular" },
            { name: "estadoAfiliado", label: "Estado" },
          ].map(({ name, label }) => (
            <Grid item xs={12} md={4} key={name}>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={label}
                    fullWidth
                    size="small"
                    disabled
                  />
                )}
              />
            </Grid>
          ))}

          {[ // fechas
            { name: "fechaNacimientoAfiliado", label: "Fecha Nacimiento" },
            { name: "fechaVenAfiliado", label: "Fecha Vencimiento" },
            { name: "fechaAfiliacionAfiliado", label: "Fecha Afiliación" },

          ].map(({ name, label }) => (
            <Grid item xs={12} md={4} key={name}>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={label}
                    type="date"
                    fullWidth
                    size="small"
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
          ))}
        </Grid>

        {/* Acciones */}
        <Grid container justifyContent="space-evenly" mt={4}>
          {/* <Button
            component={Link}
            to={`/titulares/${idTitular}`}
            startIcon={<PersonIcon />}
            variant="text"
            sx={{ color: "#0097B2" }}
          >
            Ver Titular
          </Button> */}

          <Button
            startIcon={<WhatsAppIcon />}
            variant="text"
            sx={{ color: "#0097B2" }}
            onClick={handleWhatsApp}
          >
            Enviar Mensaje
          </Button>
        </Grid>
      </Box>
    </Paper>
  );
}
