import mongoose from "mongoose";

const afiliadoSchema = new mongoose.Schema(
  {
    nombreAfiliado: {
      type: String,
      required: true,
    },
    apellidoAfiliado: {
      type: String,
      required: true,
    },
    tipoDocAfiliado: {
      type: String,
      required: true,
    },
    documentoAfiliado: {
      type: Number,
      required: true,
      unique: true,
    },
    correoAfiliado: {
      type: String,
    },
    telefonoAfiliado: {
      type: String,
    },
    direccionAfiliado: {
      type: String,
    },
    fechaNacimientoAfiliado: {
      type: Date,
      required: true,
    },
    fechaAfiliacionAfiliado: {
      type: Date,
      required: true,
    },
    fechaVenAfiliado: {
      type: Date,
      required: true,
    },
    serviciosAfiliado: {
      type: [String],
    },
    estadoAfiliado: {
      type: Boolean,
      default: true,
    },
    perteneceTitular: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Headline", // referencia al modelo del titular
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Afiliado", afiliadoSchema);
