import { useEffect, useRef } from 'react';

export default function HustlerMap() {
  const mapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 43.7, lng: -79.4 }, // Toronto default
        zoom: 12,
      });

      const input = inputRef.current;
      const autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', map);

      const marker = new window.google.maps.Marker({
        map,
        anchorPoint: new window.google.maps.Point(0, -29),
      });

      autocomplete.addListener('place_changed', () => {
        marker.setVisible(false);
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          alert('No details available for: ' + place.name);
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(15);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
      });
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder=" Search hustles, spots, or businesses..."
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          fontSize: '16px',
        }}
      />
      <div
        ref={mapRef}
        style={{ width: '100%', height: '500px', borderRadius: '12px' }}
      />
    </div>
  );
}



