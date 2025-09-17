import BaseModal from "./BaseModal.jsx";
import { useState } from "react";
import { createCategory } from "../../api/categories";
import "../../assets/styles/modals.css";
import ToastsTypes from "../toasts/toasts.js";

function CategoryModal({ isOpen, onClose, onCategoryAdded }) {
  const [categoryName, setCategoryName] = useState("");
  
  // notifications

  const handleAddCategory = async () => {
    if (!categoryName) return ToastsTypes.NotifyNoCategory()
    try {
      await createCategory({ name: categoryName.toUpperCase() });
      onCategoryAdded();
      setCategoryName("");
      ToastsTypes.CategorySuccessCreated()
      onClose();
    } catch (error) {
      console.error("Error al agregar la categoría", error);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Agregar Categoría"
      shouldCloseOnOverlayClick={false}
      className="modal-content-base"
      overlayClassName="modal-overlay"
      title={"Agregar Categoría"}
    >
      <div className="form-modal">
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
      </div>
      <div className="modal-actions">
        <button className="modal-btn confirm" onClick={handleAddCategory}>Agregar</button>
        <button className="modal-btn cancel" onClick={onClose}>Cancelar</button>
      </div>
    </BaseModal>
  );
}

export default CategoryModal;
