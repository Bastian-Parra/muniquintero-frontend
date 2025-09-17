import "../assets/styles/cenco.css";
import { createReport, getAllReports } from "../api/reports.js";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useForm } from "react-hook-form";
import { useInstitutions } from "../hooks/useInstitutions.js";
import ContainerSection from "../components/ContainerSection.jsx";
import CustomModal from "../components/modals/CustomModal.jsx";
import SituationSelector from "../components/cenco/SituationSelector.jsx";
import Form from "../components/cenco/Form.jsx";
import Historial from "../components/cenco/Historial.jsx";

function CencoPage() {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [errores, setErrores] = useState([]);
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationInput, setLocationInput] = useState("");
  const [userReports, setUserReports] = useState([]);
  const [showSituationModal, setShowSituationModal] = useState(false);
  const [selectedSituation, setSelectedSituation] = useState("");
  const [isDerived, setIsDerived] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const { institutions } = useInstitutions();
  const navigate = useNavigate();

  // Redirige si el usuario no es CENCO
  useEffect(() => {
    if (user.role !== "CENCO") navigate("/");
  }, [user, navigate]);

  // Obtiene todos los reportes y filtra los del usuario
  useEffect(() => {
    const fetchAllReports = async () => {
      try {
        const res = await getAllReports();
        setReports(res.data);
        setUserReports(res.data.filter((r) => r.reporter_id === user.id));
      } catch {
        console.error("Error fetching all reports");
      }
    };
    fetchAllReports();
  }, [user.id]);

  // Modal de situación
  const handleSelectSituation = (situation) => {
    setSelectedSituation(situation);
    setShowSituationModal(false);
  };

  useEffect(() => {
    if (!showModal) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  }, [showModal]);

  // Envío de formulario
  const onSubmit = async (data) => {
    if (!selectedSituation) {
      setErrores(["Debes seleccionar una situación."]);
      return;
    }
    try {
      const now = new Date();
      const utcTime = now.toISOString();

      const chileTime = new Date(
        now.toLocaleString("en-US", { timeZone: "America/Santiago" })
      );
      const hours = chileTime.getHours();
      const minutes = String(chileTime.getMinutes()).padStart(2, "0");
      const currentTime = `${String(hours).padStart(2, "0")}:${minutes}`;

      let shift = "MADRUGADA";
      if (hours >= 6 && hours < 12) shift = "MAÑANA";
      else if (hours >= 12 && hours < 19) shift = "TARDE";
      else if (hours >= 19 && hours < 24) shift = "NOCHE";

      const derivedInstitution = isDerived
        ? selectedInstitution
        : "Seguridad Ciudadana";

      const formData = {
        shift,
        radio_operator: data.radio_operator,
        report_date: utcTime,
        monitoring_operator_1: data.monitoring_operator_1,
        monitoring_operator_2: data.monitoring_operator_2,
        mobiles: data.mobiles,
        quadrant: data.quadrant,
        portables: data.portables,
        location: locationInput,
        call_time: currentTime,
        contact: data.contact,
        name: data.name,
        situation: selectedSituation,
        derived_report: derivedInstitution,
        closure: data.closure,
        latitude: location?.lat ?? null,
        longitude: location?.lng ?? null,
        reporter_id: user.id,
      };

      await createReport(formData);
      setShowModal(true);
      reset();
      setLocation(null);
      setLocationInput("");
      setIsDerived(false);
      setSelectedInstitution("");
      setSelectedSituation("");
    } catch (error) {
      setErrores(error.response?.data || ["Error al crear el reporte"]);
    }
  };

  return (
    <ContainerSection>
      <div className="cenco-page">
        <Form
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          setLocationInput={setLocationInput}
          register={register}
          locationInput={locationInput}
          setIsDerived={setIsDerived}
          selectedInstitution={selectedInstitution}
          setSelectedInstitution={setSelectedInstitution}
          institutions={institutions}
          isDerived={isDerived}
          selectedSituation={selectedSituation}
          setShowSituationModal={setShowSituationModal}
          setLocation={setLocation}
        />
        <Historial userId={user.id} />
      </div>
      <SituationSelector
        isOpen={showSituationModal}
        onRequestClose={() => setShowSituationModal(false)}
        onSelectSituation={handleSelectSituation}
      />
      <CustomModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        title="Reporte creado"
      >
        <p>El reporte ha sido creado exitosamente.</p>
      </CustomModal>
    </ContainerSection>
  );
}

export default CencoPage;
