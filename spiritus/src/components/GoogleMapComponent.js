import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '16rem', // 64 in Tailwind (h-64)
  borderRadius: '0.5rem'
};

const defaultCenter = {
  lat: 28.6139, // Default to Delhi, India
  lng: 77.2090
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ]
};

function GoogleMapComponent({ address, doctorName }) {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [marker, setMarker] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // Geocode the address to get coordinates
  const geocodeAddress = useCallback(async () => {
    if (!address || !window.google) return;

    setIsLoading(true);
    setError(null);

    try {
      const geocoder = new window.google.maps.Geocoder();
      const fullAddress = `${address.line1}, ${address.line2}`.replace(', ,', ',');
      
      geocoder.geocode({ address: fullAddress }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          const newCenter = {
            lat: location.lat(),
            lng: location.lng()
          };
          setCenter(newCenter);
          setMarker({
            position: newCenter,
            title: `${doctorName}'s Clinic`,
            address: fullAddress
          });
          
          if (map) {
            map.setCenter(newCenter);
            map.setZoom(16);
          }
        } else {
          console.error('Geocoding failed:', status);
          setError('Unable to locate address on map');
        }
        setIsLoading(false);
      });
    } catch (err) {
      console.error('Geocoding error:', err);
      setError('Failed to load map location');
      setIsLoading(false);
    }
  }, [address, doctorName, map]);

  useEffect(() => {
    if (window.google && address) {
      geocodeAddress();
    }
  }, [geocodeAddress]);

  const handleMarkerClick = () => {
    setShowInfoWindow(true);
  };

  const handleInfoWindowClose = () => {
    setShowInfoWindow(false);
  };

  const openInGoogleMaps = () => {
    const fullAddress = `${address.line1}, ${address.line2}`.replace(', ,', ',');
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
    window.open(url, '_blank');
  };

  if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="h-64 bg-red-50 rounded-lg flex items-center justify-center border border-red-200">
        <div className="text-center">
          <p className="text-red-600 font-medium">Google Maps API Key Required</p>
          <p className="text-red-500 text-sm mt-1">Please add REACT_APP_GOOGLE_MAPS_API_KEY to your .env file</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={['places']}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {marker && (
            <>
              <Marker
                position={marker.position}
                title={marker.title}
                onClick={handleMarkerClick}
                icon={{
                  url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  scaledSize: new window.google.maps.Size(32, 32)
                }}
              />
              {showInfoWindow && (
                <InfoWindow
                  position={marker.position}
                  onCloseClick={handleInfoWindowClose}
                >
                  <div className="p-2 max-w-xs">
                    <h3 className="font-semibold text-gray-800 mb-1">{doctorName}'s Clinic</h3>
                    <p className="text-sm text-gray-600 mb-2">{marker.address}</p>
                    <button
                      onClick={openInGoogleMaps}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Open in Google Maps
                    </button>
                  </div>
                </InfoWindow>
              )}
            </>
          )}
        </GoogleMap>
      </LoadScript>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Loading map...</span>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 bg-red-50 rounded-lg flex items-center justify-center border border-red-200">
          <div className="text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={geocodeAddress}
              className="text-red-500 text-sm mt-1 hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Map controls */}
      <div className="absolute bottom-2 right-2 bg-white rounded-lg shadow-md">
        <button
          onClick={openInGoogleMaps}
          className="px-3 py-2 text-xs font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
          title="Open in Google Maps"
        >
          <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
          </svg>
          Open
        </button>
      </div>
    </div>
  );
}

export default GoogleMapComponent;