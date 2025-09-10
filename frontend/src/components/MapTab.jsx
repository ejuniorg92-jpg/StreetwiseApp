import React, { useEffect, useRef } from 'react';

export default function MapTab({ mode }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 43.7, lng: -79.4 },
        zoom: 12,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#00ff00' }] },
          {
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#000000' }],
          },
          { featureType: 'water', stylers: [{ color: '#0f2027' }] },
        ],
      });

      new google.maps.marker.AdvancedMarkerElement({
        position: { lat: 43.7, lng: -79.4 },
        map,
        title: 'Streetwise HQ',
      });
    };

    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCtvF12NYXVTAxYNsjLq0Jl1l_a4PLluvs&libraries=places&callback=initMap';
    script.async = true;
    script.defer = true;
    window.initMap = initMap;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div className="p-2 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-bold text-green-400 mb-2">Street Map</h2>
      <div ref={mapRef} className="w-full h-96 rounded-lg" />
    </div>
  );
}



