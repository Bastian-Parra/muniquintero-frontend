import BaseModal from "./BaseModal.jsx";

const DeleteModal = ({ isOpen, onRequestClose, title, children }) => (
  <BaseModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    title={title}
    className="modal-content-base modal-delete"
    overlayClassName="modal-base"
  >
    {children}
  </BaseModal>
);

export default DeleteModal;
