import ContainerSection from "../../components/ContainerSection";
import "../../components/icons/AdminIcons"
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminPage() {

  const {user} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.id_rol !== 1) {
    navigate("/supervisor-dashboard")
  }
  }, [])

 return (

    <ContainerSection>

      <div className="admin-page">
        <Outlet />
      </div>
    </ContainerSection>
  );
}

export default AdminPage;