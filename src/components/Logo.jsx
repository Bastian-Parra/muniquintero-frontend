import Logo from "../assets/images/logo-muni.webp";
import "../assets/styles/logo.css";

function LogoComponent() {
  return (
    <>
      <img src={Logo} alt="Logo" className="logo" />
    </>
  );
}

export default LogoComponent;
