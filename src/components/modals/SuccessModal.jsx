import Modal from "react-modal";
import "../../assets/styles/modals.css";
import BaseModal from "./BaseModal.jsx";

const SuccessModal = ({ isOpen, onRequestClose, title, children }) => (
  <BaseModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    title={title}
    className="modal-content-base modal-success"
    overlayClassName="modal-base"
  >
    <div className="modal-success-icon">
      <div className="modal-success-check"></div>
    </div>
    <div>{children}</div>
  </BaseModal>
);

export default SuccessModal;
