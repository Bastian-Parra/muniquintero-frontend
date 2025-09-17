import { useEffect, useState } from "react";
import StatisticsAPI from "../../api/statistics";
import "../../assets/styles/stats.css";

function MostCommonSituations() {
  const [situations, setSituations] = useState([]);

  useEffect(() => {
    const fetchSituations = async () => {
      try {
        const res = await StatisticsAPI.getMostCommonSituations();
        setSituations(res);
      } catch (error) {
        console.error("Error fetching situations", error);
      }
    };

    fetchSituations();
  }, []);
  return (
    <div className="common-situations-container">
      <h1>Situaciones más Recurrentes</h1>
      <ul>
        {situations.map((s) => (
          <div key={s.situationId}>
            <span>{s.count}</span>
            <li>{s.situationId}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MostCommonSituations;
