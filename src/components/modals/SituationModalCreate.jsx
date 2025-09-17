import { useState } from "react";
import { createSituation } from "../../api/situations";
import "../../assets/styles/modals.css";
import BaseModal from "./BaseModal";
import ToastsTypes from "../toasts/toasts.js";

function SituationModal({ isOpen, onClose, onSituationAdded, categories }) {
  const [situationName, setSituationName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const handleAddSituation = async () => {
    if (!situationName || !selectedCategoryId)
      return ToastsTypes.RequiredAllInputs();
    try {
      await createSituation({
        name: situationName.toUpperCase(),
        category_id: selectedCategoryId,
      });
      onSituationAdded();
      ToastsTypes.SituationSuccessCreated();
      setSituationName('')
      setSelectedCategoryId('')
      onClose();
    } catch (error) {
      console.error("Error al agregar la situación", error);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Agregar Situación"
      className="modal-content-base modal-situation-create"
      shouldCloseOnOverlayClick={false}
      title={"Agregar Situación"}
    >
      <div className="form-modal">
        <div className="form-group">
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Nombre de la situación"
            value={situationName}
            onChange={(e) => setSituationName(e.target.value)}
          />
        </div>
      </div>
      <div className="modal-actions">
        <button className="modal-btn confirm" onClick={handleAddSituation}>
          Agregar
        </button>
        <button className="modal-btn cancel" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </BaseModal>
  );
}

export default SituationModal;
