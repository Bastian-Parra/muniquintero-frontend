import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Outlet } from "react-router-dom";
import '../assets/styles/layout.css'
import '../assets/styles/loader.css'
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function DashboardLayout() {
 const { isAuthenticated, loading } = useAuth();
 const [minLoading, setMinLoading] = useState(true)

 useEffect(() => {
  const timer = setTimeout(() => {
    setMinLoading(false)
  }, 1000)

  return () => clearTimeout(timer)
 })
 
 if (loading || minLoading) {
   return (
    <div className="loader">
      <div className="loader-spinner"></div>
      Cargando...
    </div>
   )
 }


 if (!isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="layout-container">
      <Header />
      <div className="layout-inside">
        <Sidebar />
        <main className="main-content">{<Outlet />}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
