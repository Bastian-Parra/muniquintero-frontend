import ContainerSection from "../components/ContainerSection.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllReports } from "../api/reports.js";
import { convertTo12HourFormat } from "../utils/utils.js";
import { deleteReport } from "../api/reports.js";
import "../assets/styles/reports.css";
import DeleteModal from "../components/modals/DeleteModal.jsx";
import SuccessMessage from "../components/modals/SuccessModal.jsx";
import {
  DownloadIcon,
  DeleteIcon,
  MoreIcon,
} from "../components/icons/SupervisorIcons.jsx";
import { Tooltip } from "react-tooltip";
import { convertDate } from "../utils/ConvertTime.js";
import { useInstitutions } from "../hooks/useInstitutions.js";
import { generatePDF } from "../utils/generatePDF.js";
import { generateEXCEL } from "../utils/generateEXCEL.js";
import { FilterIcon } from "../components/icons/AdminIcons.jsx"

function ReportsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { institutions, loading, error } = useInstitutions();

  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [reportsPerPage, setReportsPerPage] = useState(15);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSituation, setSelectedSituation] = useState("");
  const [selectedInstitutionType, setSelectedInstitutionType] = useState("");

  const fetchAllReports = async () => {
    try {
      const res = await getAllReports();
      setReports(res.data);
    } catch (error) {
      console.error("Error fetching all reports");
    }
  };

  useEffect(() => {
    if (!user) return;
    if (user.role !== "SUPERVISOR") {
      navigate("/");
    }
    fetchAllReports();
  }, [user]);

  // filtrado combinado de reportes

  const filteredReports = reports.filter((report) => {
    const reportDate = new Date(report.report_date);
    return (
      report.radio_operator.toLowerCase().includes(searchTerm.toLowerCase()) &&
      report.shift.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!startDate || reportDate >= new Date(startDate)) &&
      (!endDate || reportDate <= new Date(endDate)) &&
      report.location.toLowerCase().includes(selectedLocation.toLowerCase()) &&
      report.situation
        .toLowerCase()
        .includes(selectedSituation.toLowerCase()) &&
      (selectedInstitutionType === "" ||
        selectedInstitutionType === "TODAS" ||
        report.derived_report?.toLowerCase() ===
          selectedInstitutionType.toLowerCase())
    );
  });

  // orderar reportes
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.report_date) - new Date(b.report_date);
    } else if (sortKey === "shift") {
      return a.shift.localeCompare(b.shift);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedReports.length / reportsPerPage);

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = sortedReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  const paginate = (pageNumber) => setSearchParams({ page: pageNumber });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchParams({ page: 1 });
  };

  const handleDetailsClick = (reportId) => {
    navigate(`/reports/${reportId}`);
  };

  const handleDeleteClick = (reportId) => {
    setShowModal(true);
    setReportToDelete(reportId);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteReport(reportToDelete);
      setShowModal(false);
      setReportToDelete(null);
      setShowSuccessMessage(true);
      fetchAllReports();
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReportToDelete(null);
  };

  return (
    <>
      <ContainerSection>
        <div className="search-container">
          <label>
            <p>Desde</p>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            <p>Hasta</p>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>

          <input
            type="text"
            placeholder="Filtrar por Ubicación"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          />

          <select
            value={selectedInstitutionType}
            onChange={(e) => setSelectedInstitutionType(e.target.value)}
          >
            <option value="TODAS">Todas las instituciones</option>
            {!loading &&
              institutions?.map((inst) => (
                <option key={inst.id} value={inst.name}>
                  {inst.name}
                </option>
              ))}
          </select>

          <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
            <option value="date">Ordenar por Fecha</option>
            <option value="shift">Ordenar por Turno</option>
          </select>

          <select
            value={reportsPerPage}
            onChange={(e) => setReportsPerPage(parseInt(e.target.value))}
          >
            <option value={10}>10 filas</option>
            <option value={15}>15 filas</option>
            <option value={20}>20 filas</option>
            <option value={50}>50 filas </option>
          </select>
          <button
            onClick={() => generatePDF({ sortedReports })}
            className="btn-download pdf"
            data-tooltip-id="download-tooltip"
          >
            <DownloadIcon /> Descargar PDF
          </button>
          <button
            onClick={() => generateEXCEL({ sortedReports })}
            className="btn-download excel"
            data-tooltip-id="download-tooltip"
          >
            <DownloadIcon /> Formato Excel
          </button>
          <Tooltip
            id="download-tooltip"
            content="Al hacer clic, estarás descargando los reportes que hayas filtrado con anterioridad. Si no filtraste nada, se descargarán todos los reportes creados hasta la fecha."
          />
        </div>

        <div className="reports-list">
          {reports.length === 0 ? (
            <p>No hay reportes disponibles.</p>
          ) : (
            <>
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Hora llamada</th>
                    <th>Turno</th>
                    <th>Situación</th>
                    <th>Ubicación</th>
                    <th>Institución Derivada</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentReports.map((report) => (
                    <tr key={report.id}>
                      <td>{convertDate(report.report_date)}</td>
                      <td>{convertTo12HourFormat(report.call_time)}</td>
                      <td>{report.shift}</td>
                      <td>{report.situation}</td>
                      <td>{report.location}</td>
                      <td>{report.derived_report}</td>
                      <td>
                        <div className="action-container">
                          <button
                            className="reports-btn"
                            data-tooltip-id="detail-tooltip"
                            onClick={() => handleDetailsClick(report.id)}
                          >
                            <MoreIcon />
                          </button>
                          <Tooltip id="detail-tooltip" content="Ver detalles" />
                          {user.id_rol === 1 && (
                            <>
                              <button
                                className="reports-btn"
                                data-tooltip-id="delete-tooltip"
                                onClick={() => handleDeleteClick(report.id)}
                              >
                                <DeleteIcon />
                              </button>
                              <Tooltip
                                id="delete-tooltip"
                                content="Eliminar reporte"
                              />
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </ContainerSection>

      <DeleteModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        title="Confirmar Eliminación"
      >
        <p>¿Estás seguro/a que deseas eliminar este reporte?</p>
        <div className="modal-actions">
          <button className="modal-btn confirm" onClick={handleConfirmDelete}>
            Eliminar
          </button>
          <button className="modal-btn cancel" onClick={handleCloseModal}>
            Cancelar
          </button>
        </div>
      </DeleteModal>

      <SuccessMessage
        isOpen={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
      />
    </>
  );
}

export default ReportsPage;
