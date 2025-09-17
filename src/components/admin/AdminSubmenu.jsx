import "../../assets/styles/admin.css";
import { AdminSubmenuIcons } from "../icons/AdminSubmenuIcons";
import { Link, useLocation } from "react-router-dom";
function AdminSubmenu() {
  const location = useLocation();
  return (
    <div className="admin-submenu">
      <ul>
        <li>
          <Link
            to="/admin/accounts"
            className={location.pathname === "/admin/accounts" ? "active" : ""}
          >
            <AdminSubmenuIcons.AccountsIcon />
            Cuentas
          </Link>
        </li>
        <li>
          <Link
            to="/admin/situations"
            className={
              location.pathname === "/admin/situations" ? "active" : ""
            }
          >
            <AdminSubmenuIcons.SituationsIcon /> Situaciones
          </Link>
        </li>
        {/* <li>
          <Link
            to="/admin/institutions"
            className={
              location.pathname === "/admin/institutions" ? "active" : ""
            }
          >
            <AdminSubmenuIcons.SituationsIcon /> Intituciones
          </Link>
        </li> */}
        {/* <li>
          <Link
            to="/admin/import"
            className={location.pathname === "/admin/import" ? "active" : ""}
          >
            <AdminSubmenuIcons.ImportIcon /> Importar Datos
          </Link>
        </li> */}
        {/* <li>
          <Link
            to="/admin/export"
            className={location.pathname === "/admin/export" ? "active" : ""}
          >
            <AdminSubmenuIcons.ExportIcon /> Exportar Datos
          </Link>
        </li> */}
      </ul>
    </div>
  );
}

export default AdminSubmenu;
