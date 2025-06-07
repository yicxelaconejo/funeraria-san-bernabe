import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHeadline } from "../context/HeadlinesContext";

export default function RouteMap() {
  const { getHeadline, headlines } = useHeadline();
  const [locations, setLocations] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    getHeadline();
  }, []);

  useEffect(() => {
    if (headlines.length > 0) {
      const locs = headlines
        .filter(h => h.latitud && h.longitud)
        .map(h => ({
          id: h._id,
          name: `${h.nombreTitular} ${h.apellidoTitular}`,
          address: h.direccionTitular,
          lat: parseFloat(h.latitud),
          lng: parseFloat(h.longitud)
        }))
        .filter(loc => !isNaN(loc.lat) && !isNaN(loc.lng));

      console.log("Locations para ruta:", locs);
      setLocations(locs);
    }
  }, [headlines]);

  // Para probar con datos dummy, descomenta esto:
//   useEffect(() => {
//     const dummyLocations = [
//       { id: 1, name: "Punto 1", address: "Calle 1", lat: 6.2442, lng: -75.5812 },
//       { id: 2, name: "Punto 2", address: "Calle 2", lat: 6.2500, lng: -75.5800 },
//       { id: 3, name: "Punto 3", address: "Calle 3", lat: 6.2550, lng: -75.5900 }
//     ];
//     setLocations(dummyLocations);
//   }, []);

  // Movimiento del marcador paso a paso
  useEffect(() => {
    let interval;
    if (isPlaying && locations.length > 0) {
      interval = setInterval(() => {
        setCurrentStep(prevStep => {
          if (prevStep < locations.length - 1) {
            return prevStep + 1;
          } else {
            clearInterval(interval);
            setIsPlaying(false);
            return prevStep;
          }
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, locations]);

  const handleStartRoute = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const icon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div style={{ height: "100vh" }}>
      <button onClick={handleStartRoute} style={{ margin: "10px" }}>
        Iniciar recorrido
      </button>

      <MapContainer
        center={locations.length > 0 ? [locations[0].lat, locations[0].lng] : [6.2442, -75.5812]}
        zoom={13}
        style={{ height: "90%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marcas fijas de titulares */}
        {locations.map((loc, idx) => (
          <Marker key={idx} position={[loc.lat, loc.lng]}>
            <Popup>
              <strong>{loc.name}</strong><br />
              {loc.address}
            </Popup>
          </Marker>
        ))}

        {/* Línea de la ruta solo si hay 2 o más puntos */}
        {locations.length > 1 && (
          <Polyline positions={locations.map(loc => [loc.lat, loc.lng])} color="blue" />
        )}

        {/* Marcador móvil de recorrido */}
        {isPlaying && locations[currentStep] && (
          <Marker position={[locations[currentStep].lat, locations[currentStep].lng]} icon={icon}>
            <Popup>
              <strong>Visitando:</strong><br />
              {locations[currentStep].name}<br />
              {locations[currentStep].address}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
