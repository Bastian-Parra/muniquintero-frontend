import ContainerSection from "../../components/ContainerSection.jsx";
import SideBar from "../../components/admin/Sidebar.jsx";
import { useState } from "react";
import ContentAdmin from "../../components/admin/Content.jsx";
import "../../assets/styles/users.css";

function UsersPage() {
  const [selectedOption, setSelectedOption] = useState("home"); // initial sidebar option

  return (
    <>
      <ContainerSection>
        <div className="principal-container">
          <SideBar onSelect={(option) => setSelectedOption(option)} />
          <ContentAdmin selectedOption={selectedOption} />
        </div>
      </ContainerSection>
    </>
  );
}

export default UsersPage;
