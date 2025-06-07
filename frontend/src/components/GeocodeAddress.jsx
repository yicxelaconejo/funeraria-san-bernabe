import React, { useState } from 'react';

export default function GeocodeAddress({ address, onCoordinates }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCoordinates = async () => {
    if (!address) return;
    setLoading(true);
    setError(null);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        onCoordinates({ lat, lon });
      } else {
        setError('No se encontró la ubicación');
      }
    } catch (err) {
      setError('Error al buscar la ubicación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button type="button" onClick={fetchCoordinates} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar ubicación'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
