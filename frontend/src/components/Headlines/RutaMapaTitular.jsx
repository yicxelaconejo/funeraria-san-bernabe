import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useHeadline } from "../../context/HeadlinesContext";

const origen = { lat: 2.441, lon: -76.606 }; // Centro de Popayán

const Routing = ({ destLat, destLng, titular }) => {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!destLat || !destLng) return;

    // Limpia la ruta anterior
    if (routingRef.current) {
      map.removeControl(routingRef.current);
    }

    // Crea nueva ruta
    routingRef.current = L.Routing.control({
      waypoints: [
        L.latLng(origen.lat, origen.lon),
        L.latLng(destLat, destLng),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      show: false,
      createMarker: (i, wp) => {
        return L.marker(wp.latLng, {
          icon: L.icon({
            iconUrl:
              i === 0
                ? "https://cdn-icons-png.flaticon.com/512/684/684908.png"
                : "https://cdn-icons-png.flaticon.com/512/149/149060.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          }),
        }).bindPopup(
          i === 0
            ? "Punto de partida"
            : `${titular.nombreTitular} ${titular.apellidoTitular}<br>${titular.direccionTitular}`
        );
      },
    }).addTo(map);

    return () => {
      map.removeControl(routingRef.current);
    };
  }, [destLat, destLng, titular, map]);

  return null;
};

const RutaMapaTitular = () => {
  const { id } = useParams();
  const { getHeadlineid } = useHeadline();
  const [titular, setTitular] = useState(null);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await getHeadlineid(id);
      if (data && data.latitud && data.longitud) {
        const lat = parseFloat(data.latitud);
        const lon = parseFloat(data.longitud);
        if (!isNaN(lat) && !isNaN(lon)) {
          setTitular(data);
          setCoords({ lat, lon });
        } else {
          console.warn("Coordenadas inválidas:", data.latitud, data.longitud);
        }
      }
    };
    loadData();
  }, [id, getHeadlineid]);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>
        Ruta hacia: {titular?.nombreTitular} {titular?.apellidoTitular}
      </h3>
      <MapContainer
        center={[origen.lat, origen.lon]}
        zoom={14}
        style={{ height: "500px", width: "100%", marginTop: "1rem" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {coords && titular && (
          <Routing
            destLat={coords.lat}
            destLng={coords.lon}
            titular={titular}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default RutaMapaTitular;
