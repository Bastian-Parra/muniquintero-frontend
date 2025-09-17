import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

const customIcon = L.icon({
  iconUrl: "../../../marker-icon.png",
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = React.useState(null);

  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon} />
  );
}

function GeocoderControl({ onLocationSelect }) {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.Geocoder.nominatim(); // Usa Nominatim (puedes cambiarlo)
    const control = L.Control.geocoder({
      geocoder: geocoder,
      defaultMarkGeocode: false, // Evitar agregar marcadores
    });

    control
      .on("markgeocode", function (e) {
        const { center } = e.geocode;
        map.setView(center, 18); // Zoom al lugar seleccionado
        onLocationSelect(center);
      })
      .addTo(map);

    return () => map.removeControl(control);
  }, [map, onLocationSelect]);

  return null;
}

function MapSelector({ location, onLocationSelect }) {
  return (
    <MapContainer
      center={location || [-32.791174287507445, -71.52095317840578]}
      zoom={14}
      style={{ height: "650px", width: "auto" , border: "1px solid #FFAB85", borderRadius: "5px"}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeocoderControl onLocationSelect={onLocationSelect} />
      <LocationMarker position={location} onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
}

export default MapSelector;
