import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import "../../assets/styles/modals.css"; // Asegúrate de tener los estilos necesarios

const BaseWelcomeModal = ({ isOpen, onClose, content }) => {
  // Estilos por defecto que puedes personalizar o sobrescribir;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
      closeTimeoutMS={200}
    >
      <div className="modal-overlay">
        <div className="modal">
          {content}
          <button onClick={onClose}>Comenzar</button>
        </div>
      </div>
    </ReactModal>
  );
};

BaseWelcomeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.node,
  sectionName: PropTypes.string,
  customStyles: PropTypes.object,
};

export default BaseWelcomeModal;
