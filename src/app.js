// src/app.js
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import authRoutes from "./routes/auth.routes.js";
import headlineRoutes from "./routes/headlines.routes.js";
import afiliadoRoutes from "./routes/afiliados.routes.js";

const app = express();

// Solo usar CORS en desarrollo
if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));
}

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", headlineRoutes);
app.use("/api", afiliadoRoutes);

// Ruta de prueba solo en desarrollo
if (process.env.NODE_ENV !== "production") {
  app.get("/", (req, res) => {
    res.send("API Funeraria San Bernabé funcionando correctamente.");
  });
}

// En producción, servir el frontend de Vite
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}


export default app;
