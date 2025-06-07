import axios from "axios";

export async function obtenerCoordenadas(direccion) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(direccion)}&format=json&limit=1`;

  const respuesta = await axios.get(url, {
    headers: {
      'User-Agent': 'FunerariaSanBernabe/1.0 (yixcelaconejo09@gmail.com)'
    }
  });

  if (respuesta.data.length > 0) {
    const location = respuesta.data[0];
    return {
      latitud: parseFloat(location.lat),
      longitud: parseFloat(location.lon),
    };
  } else {
    throw new Error("No se pudo obtener coordenadas para la dirección");
  }
}
