import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import headlineRoutes from "./routes/headlines.routes.js";
import afiliadoRoutes from "./routes/afiliados.routes.js";
import cors from "cors";


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", headlineRoutes);
app.use("/api", afiliadoRoutes);



export default app;
