// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function MapView() {
  const ref = useRef(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      if (ref.current) {
        ref.current.innerHTML =
          '<div style="color:white;padding:20px;background:#111">Missing VITE_GOOGLE_MAPS_API_KEY in .env.local</div>';
      }
      return;
    }
    const loader = new Loader({ apiKey, version: 'weekly' });
    loader.load().then(() => {
      // @ts-ignore
      const map = new google.maps.Map(ref.current, {
        center: { lat: 43.6532, lng: -79.3832 }, // Toronto
        zoom: 12,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#0b0b0f' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#ffffff' }] },
          {
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#0b0b0f' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#101828' }],
          },
        ],
      });
      // proof marker
      // @ts-ignore
      new google.maps.Marker({
        position: { lat: 43.6532, lng: -79.3832 },
        map,
        title: 'It works!',
      });
    });
  }, []);

  return <div ref={ref} style={{ width: '100%', height: '100vh' }} />;
}






