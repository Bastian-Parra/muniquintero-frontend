import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster"
import "leaflet.heat";
import "../../assets/styles/stats.css";
import "react-leaflet-markercluster/styles"
import StatisticsAPI from "../../api/statistics.js";
import { convertDate } from "../../utils/ConvertTime.js";
import { convertTo12HourFormat } from "../../utils/utils.js";

// Componente para agregar capa de calor al mapa
function HeatMapLayer({ data, showHeatMap }) {
  const map = useMap();

  useEffect(() => {
    if (!showHeatMap || !data || data.length === 0) return;

    const heatLayer = window.L.heatLayer(data, {
      radius: 25, // Radio del calor
      blur: 15, // Desenfoque del calor
      maxZoom: 17, // Nivel máximo de zoom
    });

    heatLayer.addTo(map);

    // Limpia la capa cuando se desmonta el componente o cambian los datos
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map, showHeatMap]);

  return null;
}

function SupervisorMap({ period, showHeatMap, showMarkers}) {
  const [coordinates, setCoordinates] = useState([]);
  const [heatData, setHeatData] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const res = await StatisticsAPI.getReportsCoordinates(period);
        setCoordinates(res);

        // Prepara los datos para el mapa de calor
        const heatMapData = res.map((coord) => [
          coord.latitude,
          coord.longitude,
          1, // Intensidad por defecto
        ]);
        setHeatData(heatMapData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoordinates();
  }, [period]);

  return (
    <div>
      <MapContainer
        className="stats-map"
        center={[-32.791174287507445, -71.52095317840578]}
        zoom={14}
        style={{ height: "700px", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Capa de calor */}
        {showHeatMap && heatData.length > 0 && (
          <HeatMapLayer data={heatData} showHeatMap={showHeatMap} />
        )}

        {/* Marcadores individuales */}
        <MarkerClusterGroup>
          {showMarkers && coordinates && coordinates.length > 0
            ? coordinates.map((coord, index) => (
                <Marker
                  key={index}
                  position={[coord.latitude, coord.longitude]}
                >
                  <Popup>
                    <div>
                      <p>
                        <strong>Situación: </strong> {coord.situation}
                      </p>
                      <p>
                        <strong>Hora Llamada: </strong>{" "}
                        {convertTo12HourFormat(coord.call_time)}
                      </p>
                      <p>
                        <strong>Fecha: </strong>{" "}
                        {convertDate(coord.report_date)}
                      </p>
                      <p>
                        <strong>Ubicación: </strong> {coord.location}
                      </p>
                      <p>
                        <a href={`/reports/${coord.id}`} id="detail-map-btn">
                          Ver detalles
                        </a>
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))
            : !showMarkers || <p>No hay coordenadas disponibles.</p>}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default SupervisorMap;
