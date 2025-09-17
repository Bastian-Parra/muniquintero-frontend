import React, { useEffect, useState } from "react";
import BaseModal from "./BaseModal.jsx";

const EditSituationModal = ({
  isOpen,
  onRequestClose,
  situation,
  onSave,
  onDelete,
}) => {
  const [name, setName] = useState(situation);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setName(situation?.name || "");
    setConfirmDelete(false);
  }, [situation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...situation, name });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title={"Editar Situación"}
      showClose={true}
    >
      <form className="form-modal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            id="situation-name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>
            Si deseas eliminar la situación por favor confirma:
            <input
              type="checkbox"
              checked={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.checked)}
            />
          </label>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="modal-btn delete"
            onClick={() => onDelete(situation.id)}
            disabled={!confirmDelete}
          >
            Eliminar
          </button>
          <div>
            <button className="modal-btn confirm" type="submit">
              Guardar Cambios
            </button>
          </div>
        </div>
      </form>
    </BaseModal>
  );
};

export default EditSituationModal;
