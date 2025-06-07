import Headline from "../models/headline.model.js";
import { obtenerCoordenadas } from "../utils/geocoding.js";
import Afiliado from "../models/afiliado.model.js"; // Asegúrate de importar el modelo

import cron from "node-cron";
import axios from "axios";


export const getHeadlines = async (req, res) => {
 try {
   const headlines = await Headline.find({
     user: req.user.id
  }).populate('user');
  res.json(headlines);
 } catch (error) {
   return res.status(404).json({ message: "Headline not found" })
 }
};

export const createHeadline = async (req, res) => {
  try {
    const {
      nombreTitular,
      apellidoTitular,
      tipoDocTitular,
      documentoTitular,
      correoTitular,
      telefonoTitular,
      direccionTitular,
      fechaNacimientoTitular,
      fechaAfiliacion,
      fechaVencimiento,
      servicios,
      zonaTitular,
      estadoTitular,
    } = req.body;

    // Convertimos el teléfono a string y le agregamos el prefijo si falta
    let telefonoFormateado = String(telefonoTitular).trim();
    if (!telefonoFormateado.startsWith("57")) {
      telefonoFormateado = `57${telefonoFormateado}`;
    }

    //  Intentamos obtener coordenadas de la dirección
    let coordenadas = { latitud: null, longitud: null };
    try {
      coordenadas = await obtenerCoordenadas(direccionTitular);
    } catch (error) {
      console.error("Error obteniendo coordenadas:", error.message);
    }

    // Creamos y guardamos el nuevo titular
    const newHeadline = new Headline({
      nombreTitular,
      apellidoTitular,
      tipoDocTitular,
      documentoTitular,
      correoTitular,
      telefonoTitular: telefonoFormateado, 
      direccionTitular,
      latitud: coordenadas.latitud,
      longitud: coordenadas.longitud,
      fechaNacimientoTitular,
      fechaAfiliacion,
      fechaVencimiento,
      servicios,
      zonaTitular,
      estadoTitular,
      user: req.user.id,
    });

    const savedHeadline = await newHeadline.save();
    return res.json(savedHeadline);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear titular" });
  }
};




export const getHeadline = async (req, res) => {
 try {
   const headline = await Headline.findById(req.params.id).populate('user');
  if (!headline) return res.status(404).json({ message: "Headline not found" });
  res.json(headline);
 } catch (error) {
  return res.status(404).json({ message: "Headline not found" })
 }
};

export const toggleEstadoTitular = async (req, res) => {
  try {
    const headlineId = req.params.id;

    const headline = await Headline.findById(headlineId);
    if (!headline) {
      return res.status(404).json({ message: "Titular no encontrado" });
    }

    headline.estadoTitular = !headline.estadoTitular;
    const updatedHeadline = await headline.save();

    return res.json({
      message: `Titular ${headline.estadoTitular ? "activado" : "desactivado"} correctamente`,
      titular: updatedHeadline,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al cambiar estado del titular" });
  }
};

// export const updateHeadline = async (req, res) => {
//   try {
//     const headline = await Headline.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   if (!headline) return res.status(404).json({ message: "Headline not found" });
//   res.json(headline);
//   } catch (error) {
//      return res.status(404).json({ message: "Headline not found" })
//   }
// };

export const updateHeadline = async (req, res) => {
  try {
    const {
      nombreTitular,
      apellidoTitular,
      tipoDocTitular,
      documentoTitular,
      correoTitular,
      telefonoTitular,
      direccionTitular,
      fechaNacimientoTitular,
      fechaAfiliacion,
      fechaVencimiento,
      servicios,
      zonaTitular,
      estadoTitular,
    } = req.body;

    //  Formatear el teléfono
    let telefonoFormateado = String(telefonoTitular).trim();
    if (!telefonoFormateado.startsWith("57")) {
      telefonoFormateado = `57${telefonoFormateado}`;
    }

    // Obtener coordenadas de la dirección
    let coordenadas = { latitud: null, longitud: null };
    try {
      coordenadas = await obtenerCoordenadas(direccionTitular);
    } catch (error) {
      console.error("Error obteniendo coordenadas:", error.message);
    }

    // Actualizar titular
    const updatedHeadline = await Headline.findByIdAndUpdate(
      req.params.id,
      {
        nombreTitular,
        apellidoTitular,
        tipoDocTitular,
        documentoTitular,
        correoTitular,
        telefonoTitular: telefonoFormateado,
        direccionTitular,
        latitud: coordenadas.latitud,
        longitud: coordenadas.longitud,
        fechaNacimientoTitular,
        fechaAfiliacion,
        fechaVencimiento,
        servicios,
        zonaTitular,
        estadoTitular,
      },
      { new: true }
    );

    if (!updatedHeadline) {
      return res.status(404).json({ message: "Titular no encontrado" });
    }

    res.json(updatedHeadline);
  } catch (error) {
    console.error("Error al actualizar titular:", error);
    res.status(500).json({ message: "Error al actualizar titular" });
  }
};


// FUNCIONALIDAD AUTOMÁTICA DE ENVÍO DE MENSAJES WHATSAPP SEGÚN FECHA DE VENCIMIENTO
cron.schedule('0 8 * * *', async () => {
  try {
    const titulares = await Headline.find({});
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    for (const titular of titulares) {
      if (!titular.fechaVencimiento || !titular.telefonoTitular) continue;

      const fechaVenc = new Date(titular.fechaVencimiento);
      fechaVenc.setHours(0, 0, 0, 0);

      const diffDias = Math.floor((fechaVenc - hoy) / (1000 * 60 * 60 * 24));
      let mensaje = null;

      if (diffDias === 2) {
        mensaje = `Hola ${titular.nombreTitular}, tu pago vence en 2 días (${titular.fechaVencimiento.toLocaleDateString()}).`;
      } else if (diffDias === 0) {
        mensaje = `Hola ${titular.nombreTitular}, hoy es la fecha límite para tu pago (${titular.fechaVencimiento.toLocaleDateString()}).`;
      } else if (diffDias === -1) {
        mensaje = `Hola ${titular.nombreTitular}, tu pago venció ayer (${titular.fechaVencimiento.toLocaleDateString()}).`;
      }

      if (mensaje) {
        try {
          await axios.post('https://api.twilio.com/send', {
            to: `whatsapp:${titular.telefonoTitular}`,
            body: mensaje,
          });
          console.log(`Mensaje enviado a ${titular.telefonoTitular}`);
        } catch (err) {
          console.error('Error enviando mensaje a WhatsApp:', err.message);
        }
      }
    }
  } catch (error) {
    console.error('Error en tarea programada:', error);
  }
});


export const getAfiliadosByTitular = async (req, res) => {
  try {
    const titularId = req.params.id; // ID del titular recibido por la ruta

    const afiliados = await Afiliado.find({ perteneceTitular: titularId,estadoAfiliado:true });
    

    if (afiliados.length === 0) {
      return res.status(404).json({ message: "No hay afiliados para este titular." });
    }

    res.json(afiliados);
  } catch (error) {
    console.error("Error al obtener afiliados:", error);
    res.status(500).json({ message: "Error al obtener afiliados" });
  }
};