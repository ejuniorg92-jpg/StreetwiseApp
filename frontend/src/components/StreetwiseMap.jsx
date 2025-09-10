// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useEffect, useRef } from 'react';
import { getZones } from '../services/zones';
import { getIncidents } from '../services/incidents';
import { getMissions } from '../services/missions';
import StreetwiseOverlay from './StreetwiseOverlay';
import MapFeed from './MapFeed';

const StreetwiseMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMap = async () => {
      if (!window.google) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 43.6532, lng: -79.3832 },
        zoom: 13,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#0d0d0d' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#00ff00' }] },
        ],
      });

      const zones = await getZones();
      zones.forEach((z) => {
        new window.google.maps.Marker({
          position: z.coords,
          map,
          title: z.name,
          icon: {
            url: '/src/assets/icons/dollar.svg',
            scaledSize: new window.google.maps.Size(32, 32),
          },
        });
      });

      const incidents = await getIncidents();
      incidents.forEach((i) => {
        new window.google.maps.Marker({
          position: i.coords,
          map,
          title: i.description,
          icon: {
            url: '/src/assets/icons/warning.svg',
            scaledSize: new window.google.maps.Size(28, 28),
          },
        });
      });

      const missions = await getMissions();
      missions.forEach((m) => {
        new window.google.maps.Marker({
          position: m.coords,
          map,
          title: m.title,
          icon: {
            url: '/src/assets/icons/mission.svg',
            scaledSize: new window.google.maps.Size(30, 30),
          },
        });
      });
    };

    loadMap();
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <div ref={mapRef} className="flex-1" />
      <MapFeed />
      <StreetwiseOverlay />
    </div>
  );
};

export default StreetwiseMap;






