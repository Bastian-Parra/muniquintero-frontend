import BaseModal from "./BaseModal.jsx";
import "../../assets/styles/modals.css";

const ConfirmationModal = ({
  isOpen,
  onRequestClose,
  title = "Confirmar acción",
  message = "¿Estás seguro de que deseas realizar esta acción?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  isLoading = false,
  showButtons = true,
}) => (
  <BaseModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    title={title}
    className="modal-content-base modal-confirmation"
    overlayClassName="modal-base"
  >
    <div className="modal-body-base">
      <p>{message}</p>
    </div>
    {showButtons && (
      <div className="modal-actions">
        <button
          className="modal-btn cancel"
          onClick={onRequestClose}
          disabled={isLoading}
        >
          {cancelText}
        </button>
        <button
          className="modal-btn confirm"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Procesando..." : confirmText}
        </button>
      </div>
    )}
  </BaseModal>
);

export default ConfirmationModal;
