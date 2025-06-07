import Afiliado from "../models/afiliado.model.js";
import Headline from "../models/headline.model.js";

export const getAfiliados = async (req, res) => {
  try {
    // 1. Obtener SOLO titulares activos del usuario autenticado
    const titulares = await Headline.find({
      user: req.user.id,
      estadoAfiliado: true // Solo los titulares con estado true
    });

    // 2. Extraer los IDs de los titulares activos
    const titularIds = titulares.map(titular => titular._id);

    // 3. Buscar afiliados que pertenezcan a esos titulares
    const afiliados = await Afiliado.find({ perteneceTitular: { $in: titularIds } })
      .populate("perteneceTitular"); // Para mostrar detalles del titular (opcional)

    res.json(afiliados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los afiliados" });
  }
};


export const createAfiliado = async (req, res) => {
  try {
    const {
      nombreAfiliado,
      apellidoAfiliado,
      tipoDocAfiliado,
      documentoAfiliado,
      correoAfiliado,
      telefonoAfiliado,
      direccionAfiliado,
      fechaNacimientoAfiliado,
      fechaAfiliacionAfiliado,
      fechaVenAfiliado,
      serviciosAfiliado,
      estadoAfiliado,
      perteneceTitular, // ID del titular
    } = req.body;

    //  Verifica si el titular existe
    const titular = await Headline.findById(perteneceTitular);
    if (!titular) {
      return res.status(404).json({ message: "Titular no encontrado" });
    }

    //  Formatear teléfono (opcional)
    let telefonoFormateado = String(telefonoAfiliado).trim();
    if (telefonoFormateado && !telefonoFormateado.startsWith("57")) {
      telefonoFormateado = `57${telefonoFormateado}`;
    }

    //  Crear el afiliado
    const newAfiliado = new Afiliado({
      nombreAfiliado,
      apellidoAfiliado,
      tipoDocAfiliado,
      documentoAfiliado,
      correoAfiliado,
      telefonoAfiliado: telefonoFormateado,
      direccionAfiliado,
      fechaNacimientoAfiliado,
      fechaAfiliacionAfiliado,
      fechaVenAfiliado,
      serviciosAfiliado,
      estadoAfiliado,
      perteneceTitular,
    });

    const savedAfiliado = await newAfiliado.save();
    return res.json(savedAfiliado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear afiliado" });
  }
};


export const updateAfiliado = async (req, res) => {
  try {
    const afiliadoId = req.params.id;

    // 1. Buscar afiliado existente
    const afiliado = await Afiliado.findById(afiliadoId);
    if (!afiliado) {
      return res.status(404).json({ message: "Afiliado no encontrado" });
    }

    const {
      nombreAfiliado,
      apellidoAfiliado,
      tipoDocAfiliado,
      documentoAfiliado,
      correoAfiliado,
      telefonoAfiliado,
      direccionAfiliado,
      fechaNacimientoAfiliado,
      fechaAfiliacionAfiliado,
      fechaVenAfiliado,
      serviciosAfiliado,
      estadoAfiliado,
      perteneceTitular,
    } = req.body;

    // 2. Validar titular si cambió
    if (perteneceTitular && perteneceTitular !== String(afiliado.perteneceTitular)) {
      const titular = await Headline.findById(perteneceTitular);
      if (!titular) {
        return res.status(404).json({ message: "Titular no encontrado" });
      }
      afiliado.perteneceTitular = perteneceTitular;
    }

    // 3. Formatear teléfono
    let telefonoFormateado = String(telefonoAfiliado).trim();
    if (telefonoFormateado && !telefonoFormateado.startsWith("57")) {
      telefonoFormateado = `57${telefonoFormateado}`;
    }

    // 4. Actualizar campos
    afiliado.nombreAfiliado = nombreAfiliado;
    afiliado.apellidoAfiliado = apellidoAfiliado;
    afiliado.tipoDocAfiliado = tipoDocAfiliado;
    afiliado.documentoAfiliado = documentoAfiliado;
    afiliado.correoAfiliado = correoAfiliado;
    afiliado.telefonoAfiliado = telefonoFormateado;
    afiliado.direccionAfiliado = direccionAfiliado;
    afiliado.fechaNacimientoAfiliado = fechaNacimientoAfiliado;
    afiliado.fechaAfiliacionAfiliado = fechaAfiliacionAfiliado;
    afiliado.fechaVenAfiliado = fechaVenAfiliado;
    afiliado.serviciosAfiliado = serviciosAfiliado;
    afiliado.estadoAfiliado = estadoAfiliado;

    const updatedAfiliado = await afiliado.save();
    return res.json(updatedAfiliado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar afiliado" });
  }
};


export const getAfiliadoById = async (req, res) => {
  try {
    const afiliadoId = req.params.id;

    const afiliado = await Afiliado.findById(afiliadoId).populate("perteneceTitular");

    if (!afiliado) {
      return res.status(404).json({ message: "Afiliado no encontrado" });
    }

    return res.json(afiliado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener afiliado" });
  }
};


export const toggleAfiliadoEstado = async (req, res) => {
  try {
    const afiliadoId = req.params.id;

    // 1. Buscar afiliado
    const afiliado = await Afiliado.findById(afiliadoId);
    if (!afiliado) {
      return res.status(404).json({ message: "Afiliado no encontrado" });
    }

    // 2. Cambiar el estado al opuesto
    afiliado.estadoAfiliado = !afiliado.estadoAfiliado;

    const updatedAfiliado = await afiliado.save();

    return res.json({
      message: `Afiliado ${afiliado.estadoAfiliado ? "activado" : "desactivado"} correctamente`,
      afiliado: updatedAfiliado,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al cambiar estado del afiliado" });
  }
};
