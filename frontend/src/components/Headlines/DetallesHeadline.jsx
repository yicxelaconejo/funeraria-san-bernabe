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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GroupsIcon from "@mui/icons-material/Groups";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useHeadline } from "../../context/HeadlinesContext";

export default function DetallesHeadline() {
  const { id } = useParams();
  const { getHeadlineid } = useHeadline();
  const navigate = useNavigate();

  const defaultValues = {
    nombreTitular: "",
    apellidoTitular: "",
    tipoDocTitular: "",
    documentoTitular: "",
    correoTitular: "",
    telefonoTitular: "",
    direccionTitular: "",
    fechaNacimientoTitular: "",
    fechaAfiliacion: "",
    fechaVencimiento: "",
    servicios: "",
    zonaTitular: "",
    estadoTitular: "",
  };

  const { control, reset, getValues } = useForm({ defaultValues });

  useEffect(() => {
    const fetchTitular = async () => {
      if (id) {
        const data = await getHeadlineid(id);

        if (data) {
          const formatDate = (dateStr) => {
            if (!dateStr) return "";
            const d = new Date(dateStr);
            if (isNaN(d)) return "";
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
          };

          const dataFormatted = {
            ...data,
            fechaNacimientoTitular: formatDate(data.fechaNacimientoTitular),
            fechaAfiliacion: formatDate(data.fechaAfiliacion),
            fechaVencimiento: formatDate(data.fechaVencimiento),
          };

          reset(dataFormatted);
        }
      }
    };
    fetchTitular();
  }, [id, getHeadlineid, reset]);

  const handleWhatsApp = () => {
    const { telefonoTitular, nombreTitular, fechaVencimiento } = getValues();
    if (!telefonoTitular || !fechaVencimiento) return;

    const vencimiento = new Date(fechaVencimiento);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    vencimiento.setHours(0, 0, 0, 0);

    const diffTime = vencimiento.getTime() - hoy.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const fechaFormateada = vencimiento.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let mensaje = "";

    if (diffDays > 0) {
      mensaje = `Hola ${nombreTitular}, te recordamos que tu pago vence el ${fechaFormateada}. Por favor realiza tu pago a tiempo.`;
    } else if (diffDays === 0) {
      mensaje = `Hola ${nombreTitular}, hoy es tu fecha límite de pago (${fechaFormateada}). Te invitamos a realizar el pago hoy mismo.`;
    } else {
      mensaje = `Hola ${nombreTitular}, tu pago venció el ${fechaFormateada}. Por favor comunícate con nosotros para regularizar tu situación.`;
    }

    const url = `https://wa.me/${telefonoTitular}?text=${encodeURIComponent(mensaje)}`;
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
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <IconButton
          onClick={() => navigate("/headlines")}
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
        variant="h5"
        align="center"
        gutterBottom
        fontWeight="bold"
        color="black"
      >
        Detalles del Titular
      </Typography>

      <Box mt={4}>
        <Grid container spacing={2}>
          {[
            { name: "nombreTitular", label: "Nombre" },
            { name: "apellidoTitular", label: "Apellido" },
            { name: "tipoDocTitular", label: "Tipo Documento" },
            { name: "documentoTitular", label: "Documento" },
            { name: "correoTitular", label: "Correo" },
            { name: "telefonoTitular", label: "Teléfono" },
            { name: "direccionTitular", label: "Dirección" },
            { name: "servicios", label: "Servicios" },
            { name: "zonaTitular", label: "Zona" },
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

          {[
            { name: "fechaNacimientoTitular", label: "Fecha Nacimiento" },
            { name: "fechaAfiliacion", label: "Fecha Afiliación" },
            { name: "fechaVencimiento", label: "Fecha Vencimiento" },
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

        <Grid container justifyContent="space-evenly" mt={4}>
          <Button
            component={Link}
            to={`/ruta-cobro/${id}`}
            startIcon={<LocationOnIcon />}
            variant="text"
            sx={{ color: "#0097B2" }}
          >
            Generar Ubicación
          </Button>

          <Button
            startIcon={<WhatsAppIcon />}
            variant="text"
            sx={{ color: "#0097B2" }}
            onClick={handleWhatsApp}
          >
            Enviar Mensaje
          </Button>

          <Button
            startIcon={<GroupsIcon />}
            variant="text"
            sx={{ color: "#0097B2" }}
          >
            Lista Afiliados
          </Button>
        </Grid>
      </Box>
    </Paper>
  );
}
