import "../assets/styles/navbar.css";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import DeleteModal from "../components/modals/DeleteModal.jsx";
import LogoComponent from "../components/Logo.jsx";

// import theme context
import { useTheme } from "../contexts/ThemeContext.jsx";

function Header() {
  const { logout, user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowModal(false);
  };

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  return (
    <header>
      <div>
        <LogoComponent />
      </div>

      <DeleteModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        title="Confirmar Cerrar Sesión"
      >
        <div className="container-delete-modal">
          <p> ¿Estás seguro/a de que deseas salir? </p>
          <button className="btn-delete yes" onClick={handleConfirmLogout}>
            Si
          </button>
          <button className="btn-delete no" onClick={handleCloseModal}>
            No
          </button>
        </div>
      </DeleteModal>
    </header>
  );
}

export default Header;
