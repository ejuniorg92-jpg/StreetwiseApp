// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZWpnOTkyIiwiYSI6ImNtZXh4YTRrZDE2NzMybG9hYjg3bG5mMGoifQ.MRcslP-oypw11vA9JxL1EQ';

export default function StreetwiseMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zones, setZones] = useState([]);

  const fetchZones = () => {
    fetch(
      'http://127.0.0.1:5011/streetwise-b13be/northamerica-northeast1/getShadyZones'
    )
      .then((res) => res.json())
      .then((data) => setZones(data.zones || []))
      .catch((err) => console.error('Zone fetch failed', err));
  };

  useEffect(() => {
    fetchZones();
  }, []);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-79.3832, 43.6532],
      zoom: 11,
    });

    const marker = new mapboxgl.Marker({ color: 'gold' })
      .setLngLat([-79.3832, 43.6532])
      .addTo(map.current);

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const { longitude, latitude } = pos.coords;
          marker.setLngLat([longitude, latitude]);
          map.current.flyTo({ center: [longitude, latitude], zoom: 13 });
        },
        (err) => console.error('GPS error', err),
        { enableHighAccuracy: true }
      );
    }

    map.current.on('load', () => {
      refreshHeatmap();
    });
  }, []);

  useEffect(() => {
    if (!map.current) return;
    refreshHeatmap();
  }, [zones]);

  const refreshHeatmap = () => {
    if (!map.current.getSource('shadyZones')) {
      map.current.addSource('shadyZones', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });
      map.current.addLayer({
        id: 'shadyZones-heat',
        type: 'heatmap',
        source: 'shadyZones',
        paint: {
          'heatmap-weight': 1,
          'heatmap-intensity': 1.5,
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(0,0,0,0)',
            0.2,
            'orange',
            0.5,
            'red',
            1,
            'darkred',
          ],
          'heatmap-radius': 40,
          'heatmap-opacity': 0.8,
        },
      });
    }
    map.current.getSource('shadyZones').setData({
      type: 'FeatureCollection',
      features: zones.map((z) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [z.lng, z.lat] },
      })),
    });
  };

  const dropZone = () => {
    if (!map.current) return;
    const center = map.current.getCenter();
    fetch(
      'http://127.0.0.1:5011/streetwise-b13be/northamerica-northeast1/dropShadyZone',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lng: center.lng, lat: center.lat }),
      }
    )
      .then((res) => res.json())
      .then(() => fetchZones());
  };

  return (
    <div>
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: '500px',
          border: '2px solid lime',
          marginTop: '20px',
        }}
      />
      <button
        onClick={dropZone}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          background: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Drop Shady Zone
      </button>
    </div>
  );
}






