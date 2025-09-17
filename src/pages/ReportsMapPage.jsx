import ContainerSection from "../components/ContainerSection.jsx";
import MapSubmenu from "../components/supervisor/MapSubmenu.jsx";
import { useFetchStatistics } from "../utils/fetchStatistics.js";
import "../assets/styles/stats.css";

function ReportsMapPage() {
  const { selectedMap, setSelectedMap } = useFetchStatistics();

  return (
    <>
      <ContainerSection>
        <div className="map-reports-container">
          
          <MapSubmenu
            selectedMap={selectedMap}
            setSelectedMap={setSelectedMap}
          />
        </div>
      </ContainerSection>
    </>
  );
}

export default ReportsMapPage;
