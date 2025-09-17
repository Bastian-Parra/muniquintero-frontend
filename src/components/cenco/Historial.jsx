import { getReportsByUserId } from "../../api/reports.js";
import { useEffect, useState } from "react";
import { convertDate } from "../../utils/ConvertTime.js";
import { HistoryIcon } from "../icons/CencoIcons.jsx";

function Historial({ userId }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    try {
      const fetchReports = async () => {
        const res = await getReportsByUserId(userId);
        setReports(res.data);
      };

      fetchReports();
    } catch (error) {
      throw new Error("Error fetching reports: " + error.message);
    }
  }, [userId]);

  return (
    <section className="historial-section">
      <h1> <HistoryIcon/> últimos reportes Creados</h1>
      <div className="historial-content">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div className="report-card" key={report.id}>
              <p>
                <strong>Situación:</strong> {report.situation}
              </p>
              <p>
                <strong>Turno:</strong> {report.shift}
              </p>
              <p>
                <strong>Fecha de creación:</strong>{" "}
                {convertDate(report.report_date)}
              </p>
              <p>
                <strong>Hora de creación:</strong> {report.call_time}
              </p>
            </div>
          ))
        ) : (
          <p>No hay reportes para mostrar.</p>
        )}
      </div>
    </section>
  );
}

export default Historial;
