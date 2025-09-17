import { CancelIcon } from "../../components/icons/AdminIcons.jsx";

function SituationsSelection({
  setIsCategoryModalOpen,
  setIsSituationModalOpen,
  selectedSituationsDetails,
  handleDeleteAllConfirmation,
  handleDesSelectSituation,
  handleEditSituation,
  handleDeleteSituation,
  setIsInstitutionModalOpen,
}) {
  return (
    <div className="selection-panel">
      <div className="actions">
        <button className="situations-btn category" onClick={() => setIsCategoryModalOpen(true)}>
          Agregar Categoría
        </button>
        <button className="situations-btn situation" onClick={() => setIsSituationModalOpen(true)}>
          Agregar Situación
        </button>
        <button className="situations-btn institution" onClick={() => setIsInstitutionModalOpen(true)}>
          Agregar Institución
        </button>
      </div>
      <div className="selected-situations">
        <h3>Seleccionadas ({selectedSituationsDetails.length})</h3>

        {selectedSituationsDetails.length === 0 ? (
          <p>No hay situaciones seleccionadas</p>
        ) : (
          <>
            <div style={{ marginBottom: "20px" }}>
              <button className="delete-all-button"
                onClick={handleDeleteAllConfirmation}
                disabled={selectedSituationsDetails.length === 0}
              >
                Eliminar todas
              </button>
            </div>

            <ul style={{ listStyle: "none", padding: 0 }}>
              {selectedSituationsDetails.map((situation) => (
                <li key={situation.id} className="situation-item">
                  <div className="situation-info">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDesSelectSituation(situation);
                      }}
                    >
                      <CancelIcon />
                    </button>
                    <span>{situation.name}</span>
                  </div>
                  <div>
                    <button onClick={() => handleEditSituation(situation)}>
                      Editar
                    </button>
                    <button onClick={() => handleDeleteSituation(situation.id)}>
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default SituationsSelection;
