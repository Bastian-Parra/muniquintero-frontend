import Modal from "react-modal";
import "../../assets/styles/modals.css";

const BaseModal = ({
  isOpen,
  onRequestClose,
  title,
  children,
  showClose = true,
  className = "modal-content-base",
  overlayClassName,
  ...props
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      shouldCloseOnOverlayClick={false}
      className={className}
      overlayClassName="modal-overlay-base"
      {...props}
    >
      <div className="modal-header-base">
        {title && <h2>{title}</h2>}
        {showClose && (
          <button
            onClick={onRequestClose}
            className="close-button-base"
            aria-label="Cerrar"
          >
            &times;
          </button>
        )}
      </div>
    <div className="modal-body-base">{children}</div>
    </Modal>
  );
};

export default BaseModal;
