import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./db.js";

const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
