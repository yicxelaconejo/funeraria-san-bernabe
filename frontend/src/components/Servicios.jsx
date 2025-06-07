import React from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const servicios = [
  {
    titulo: "Homenaje Religioso",
    descripcion: "Ceremonias según creencias religiosas o personales.",
    imagen: "images/servicio1.png",
  },
  {
    titulo: "Video Recuerdo",
    descripcion: "",
    imagen: "images/servicio4.png",
    bgColor: "#000",
  },
  {
    titulo: "Servicio de Velatorio",
    descripcion:
      "Espacios cómodos para rendir homenaje y acompañar a la familia en el adiós.",
    imagen: "images/servicio2.png",
    bgColor: "#e0f7fa",
  },
  {
    titulo: "Traslado y Transporte",
    descripcion:
      "Transporte respetuoso del cuerpo hacia el lugar de velatorio, entierro o cremación.",
    imagen: "images/servicio3.png",
    bgColor: "#e0f7fa",
  },
  {
    titulo: "Asesoría en Trámites Legales",
    descripcion:
      "Ayuda con los trámites legales necesarios tras el fallecimiento.",
    imagen: "images/servicio5.png",
    bgColor: "#f3e5f5",
  },
  {
    titulo: "Cremación",
    descripcion:
      "Proceso de cremación con total respeto, incluyendo la entrega de las cenizas a la familia.",
    imagen: "images/servicio6.png",
    bgColor: "#f3e5f5",
  },
];

export default function ServiciosFunerarios() {
  return (
    
    <Box  id="servicios"  sx={{ width: "90%", p: 10, backgroundColor: "#fff",}}>
      <Grid container spacing={10}>
        {[0, 1, 2].map((col) => (
          <Grid
            item
            xs={12}
            md={4}
            key={col}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {[servicios[col * 2], servicios[col * 2 + 1]].map((item, i) => (
              <Card
                key={i}
                sx={{
                  width: 400, // ancho fijo más pequeño
                  backgroundColor: item.bgColor,
                  color: item.textColor || "inherit",
                  mb: 2,
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={item.imagen}
                  alt={item.titulo}
                  sx={{ objectFit: "cover" }}
                />
                {item.descripcion && (
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.titulo}
                    </Typography>
                    <Typography variant="body2">{item.descripcion}</Typography>
                  </CardContent>
                )}
              </Card>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
