import BaseModal from "./BaseModal";
import { createInstitution } from "../../api/institutions";
import { useState } from "react";
import ToastsTypes from "../toasts/toasts";

function InstitutionModal({ isOpen, onClose, onInstitutionAdded }) {
  const [institutionName, setInstitutionName] = useState("");
  
  // notifications

  const handleAddInstitution = async () => {
    if (!institutionName) return ToastsTypes.NotifyNoCategory()
    try {
      await createInstitution({ name: institutionName.toUpperCase() });
      onInstitutionAdded();
      setInstitutionName("");
      ToastsTypes.CategorySuccessCreated()
      onClose();
    } catch (error) {
      console.error("Error al agregar la institucion", error);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Agregar Institución"
      shouldCloseOnOverlayClick={false}
      className="modal-content-base"
      overlayClassName="modal-overlay"
      title={"Agregar Institución"}
    >
      <div className="form-modal">
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre de la institución"
            value={institutionName}
            onChange={(e) => setInstitutionName(e.target.value)}
          />
        </div>
      </div>
      <div className="modal-actions">
        <button className="modal-btn confirm" onClick={handleAddInstitution}>Agregar</button>
        <button className="modal-btn cancel" onClick={onClose}>Cancelar</button>
      </div>
    </BaseModal>
  );
}

export default InstitutionModal
