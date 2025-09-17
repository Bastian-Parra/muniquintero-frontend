import { useState } from "react";
import SupervisorMap from "../../components/supervisor/SupervisorMap.jsx";

function MapSubmenu({ selectedMap, setSelectedMap }) {
  const [showMarkers, setShowMarkers] = useState(true);
  const [showHeatMap, setShowHeatMap] = useState(true);
  return (
    <>
      <div className="map-submenu-container">
        <div className="map-submenu">
          <div>
            <button
              className={selectedMap === "daily" ? "active" : ""}
              onClick={() => setSelectedMap("daily")}
            >
              Hoy
            </button>
            <button
              className={selectedMap === "weekly" ? "active" : ""}
              onClick={() => setSelectedMap("weekly")}
            >
              Esta semana
            </button>
            <button
              className={selectedMap === "monthly" ? "active" : ""}
              onClick={() => setSelectedMap("monthly")}
            >
              Este mes
            </button>
            <button
              className={selectedMap === "three-months" ? "active" : ""}
              onClick={() => setSelectedMap("three-months")}
            >
              Últimos 3 meses
            </button>
            <button
              className={selectedMap === "six-months" ? "active" : ""}
              onClick={() => setSelectedMap("six-months")}
            >
              Últimos 6 meses
            </button>
            <button
              className={selectedMap === "last-year" ? "active" : ""}
              onClick={() => setSelectedMap("last-year")}
            >
              Último año
            </button>
          </div>
        </div>

        <div className="map-controls">
          <label>
            <input
              type="checkbox"
              checked={showMarkers}
              onChange={() => setShowMarkers(!showMarkers)}
            />
            Mostrar marcadores
          </label>

          <label>
            <input
              type="checkbox"
              checked={showHeatMap}
              onChange={() => setShowHeatMap(!showHeatMap)}
            />
            Mostrar mapa de calor
          </label>
        </div>
      </div>

      {selectedMap === "daily" && (
        <SupervisorMap
          period="daily"
          showHeatMap={showHeatMap}
          showMarkers={showMarkers}
        />
      )}
      {selectedMap === "weekly" && (
        <SupervisorMap
          period="weekly"
          showHeatMap={showHeatMap}
          showMarkers={showMarkers}
        />
      )}
      {selectedMap === "monthly" && (
        <SupervisorMap
          period="monthly"
          showHeatMap={showHeatMap}
          showMarkers={showMarkers}
        />
      )}
      {selectedMap === "three-months" && (
        <SupervisorMap
          period="three-months"
          showHeatMap={showHeatMap}
          showMarkers={showMarkers}
        />
      )}
      {selectedMap === "six-months" && (
        <SupervisorMap
          period="six-months"
          showHeatMap={showHeatMap}
          showMarkers={showMarkers}
        />
      )}
      {selectedMap === "last-year" && (
        <SupervisorMap
          period="last-year"
          showHeatMap={showHeatMap}
          showMarkers={showMarkers}
        />
      )}
    </>
  );
}

export default MapSubmenu;
