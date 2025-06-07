import mongoose from "mongoose";

const headlineSchema = new mongoose.Schema(
  {
    nombreTitular: {
      type: String,
      required: true,
    },
    apellidoTitular: {
      type: String,
      required: true,
    },
    tipoDocTitular: {
      type: String,
      required: true,
    },
    documentoTitular: {
      type: Number,
      required: true,
    },
    correoTitular: {
      type: String,
      required: true,
    },
    telefonoTitular: {
      type: String,
    },
    direccionTitular: {
      type: String,
    },

    // --- NUEVOS CAMPOS PARA UBICACIÓN GEOGRÁFICA ---
    latitud: {
      type: Number,
    },
    longitud: {
      type: Number,
    },

    fechaNacimientoTitular: {
      type: Date,
      required: true,
    },
    fechaAfiliacion: {
      type: Date,
      required: true,
    },
    fechaVencimiento: {
      type: Date,
      required: true,
    },
    servicios: {
      type: String,
      required: true,
    },
    zonaTitular: {
      type: String,
      required: true,
    },
    estadoTitular: {
      type: Boolean,
      default: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Headline", headlineSchema);
