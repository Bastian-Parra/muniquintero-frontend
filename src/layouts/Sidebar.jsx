import {
  AdminIcon,
  StatsIcon,
  ReportsIcon,
  LogoutIcon,
  MapIcon,
  HamburgerIcon,
} from "../components/icons/NavIcons.jsx";
import { AdminSubmenuIcons } from "../components/icons/AdminSubmenuIcons.jsx";
import BaseModal from "../components/modals/BaseModal.jsx";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useState } from "react";
import "../assets/styles/sidebar.css";

function Sidebar() {
  const { logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <button className="hamburger-btn" onClick={toggleSidebar}>
        <HamburgerIcon />
      </button>
      <aside className={sidebarOpen ? "active" : ""}>
        <ul className={menuOpen ? "show" : ""}>
          {user.role === "SUPERVISOR" && (
            <>
              {/* MENU PRINCIPAL (SUPERVISOR) */}
              <label>OPCIONES SUPERVISOR</label>
              <li>
                <a
                  href="/supervisor-dashboard"
                  className={
                    location.pathname === "/supervisor-dashboard"
                      ? "active"
                      : ""
                  }
                >
                  📈 Estadísticas
                </a>
              </li>
              <li>
                <a
                  href="/reports"
                  className={location.pathname === "/reports" ? "active" : ""}
                >
                  🗂️ Reportes
                </a>
              </li>
              <li>
                <a
                  href="/reports-map"
                  className={
                    location.pathname === "/reports-map" ? "active" : ""
                  }
                >
                  🗺️ Mapa de Reportes
                </a>
              </li>

              {/* CONFIGURACIÓN (SOLO PARA ADMIN) */}
              {user.id_rol === 1 && (
                <>
                  <label>OPCIONES ADMINISTRADOR</label>
                  <li>
                    <a
                      href="/admin/situations"
                      className={
                        location.pathname.startsWith("/admin/situations")
                          ? "active"
                          : ""
                      }
                    >
                      {" "}
                      📋 Situaciones e Instituciones
                    </a>
                  </li>

                  <li>
                    <a
                      href="/admin/accounts"
                      className={
                        location.pathname.startsWith("/admin/accounts")
                          ? "active"
                          : ""
                      }
                    >
                      {" "}
                      🔒 Cuentas
                    </a>
                  </li>
                </>
              )}
            </>
          )}
        </ul>

        <div className="logout-container">
          <a href="#" onClick={handleLogoutClick}>
            <LogoutIcon /> Cerrar Sesión
          </a>
        </div>
      </aside>

      <BaseModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        title="Cerrar Sesión"
      >
        <div>
          <p> ¿Estás seguro/a de que deseas salir? </p>
          <div className="modal-actions">
            <button className="modal-btn delete" onClick={handleConfirmLogout}>
              Si
            </button>
            <button className="modal-btn no" onClick={handleCloseModal}>
              No
            </button>
          </div>
        </div>
      </BaseModal>
    </>
  );
}

export default Sidebar;
