import MapSelector from "./MapSelector.jsx";
import { ReportIconCreate } from "../icons/ReportIconCreate.jsx";
function Form({
  handleSubmit,
  onSubmit,
  setLocationInput,
  register,
  setIsDerived,
  selectedInstitution,
  setSelectedInstitution,
  institutions,
  isDerived,
  locationInput,
  selectedSituation,
  setShowSituationModal,
  setLocation,
  formRef
}) {
  return (
    <section className="reports-section">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Rellenar Formulario para crear Reporte</h2>
        <div className="form-grid">
          {[
            { id: "radio_operator", label: "Operador Radial", required: true },
            {
              id: "monitoring_operator_1",
              label: "Operador de Monitoreo 1",
              required: true,
            },
            { id: "monitoring_operator_2", label: "Operador de Monitoreo 2" },
            { id: "mobiles", label: "Móviles", required: true },
            { id: "quadrant", label: "Cuadrante", required: true },
            { id: "portables", label: "Portátiles", required: true },
            {
              id: "contact",
              label: "Contacto",
              placeholder: "Formato: 9 1234 5678",
            },
            { id: "name", label: "Nombre de Informante" },
          ].map(({ id, label, required, placeholder }) => (
            <div className="form-group" key={id}>
              <label htmlFor={id}>{label}</label>
              <input
                type="text"
                id={id}
                {...register(
                  id,
                  required ? { required: `${label} es requerido.` } : {}
                )}
                placeholder={placeholder || label}
              />
            </div>
          ))}

          <div className="form-group">
            <label htmlFor="location-input">Ubicación</label>
            <input
              type="text"
              id="location-input"
              {...register("location", {
                required: "La ubicación es requerida",
              })}
              placeholder="Ubicacion"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="derived-report">¿Reporte Derivado?</label>
            <select
              id="derived-report"
              {...register("derived-report")}
              onChange={(e) => setIsDerived(e.target.value === "yes")}
            >
              <option value="no">No</option>
              <option value="yes">Si</option>
            </select>
          </div>

          {isDerived && (
            <div className="form-group">
              <label htmlFor="institution">Seleccione Institución</label>
              <select
                id="institution"
                value={selectedInstitution}
                onChange={(e) => setSelectedInstitution(e.target.value)}
              >
                <option value="">Seleccione una institución</option>
                {institutions.map((inst) => (
                  <option key={inst.id} value={inst.name}>
                    {inst.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group situation-input">
            <label htmlFor="situation">Situación</label>
            <input
              type="text"
              id="situation"
              value={selectedSituation}
              placeholder="Situación"
              readOnly
              onClick={() => setShowSituationModal(true)}
            />
          </div>

          <div className="form-group closure-input">
            <label htmlFor="closure">Cierre</label>
            <input
              type="text"
              id="closure"
              {...register("closure")}
              placeholder="Escriba aquí como se cerró el caso."
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location" id="input-map">
            Seleccione Ubicación en el Mapa
          </label>
          <MapSelector
            className="map-container"
            onLocationSelect={setLocation}
          />
        </div>

        <button id="btn-create-report" type="submit">
          Generar Reporte <ReportIconCreate />
        </button>
      </form>
    </section>
  );
}

export default Form;
