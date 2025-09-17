import React from "react";
import Modal from "react-modal";
import "../../assets/styles/modals.css";

const CreateModal = ({ isOpen, onRequestClose, title, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      shouldCloseOnOverlayClick={false}
      className="create-modal"
      overlayClassName="custom-modal-overlay"
    >
      <div className="modal-header">
        <h2>{title}</h2>
      </div>
      <div className="modal-body">{children}</div>
      <div className="modal-footer">
        <button onClick={onRequestClose}>Cancelar</button>
        {/* Implementar el botón para crear la situación */}
      </div>
    </Modal>
  );
};

export default CreateModal;
