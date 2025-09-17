import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
// import { SocketProvider } from "./contexts/SocketContext.jsx"; pendiente
// Views imports:
import HomePage from "./pages/LoginPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import StatisticsPage from "./pages/StatisticsPage.jsx";
import CencoPage from "./pages/CencoPage.jsx";
import SupervisorPage from "./pages/SupervisorPage.jsx";
import Error404 from "./pages/404.jsx";
import ReportDetailPage from "./pages/ReportDetailPage.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import ReportsMapPage from "./pages/ReportsMapPage.jsx";
import { ReportsProvider } from "./contexts/ReportsContext.jsx";
import AccountsPage from "./pages/Admin/AccountsPage.jsx";
import AdminPage from "./pages/Admin/AdminPage.jsx";
import SituationsPage from "./pages/Admin/SituationsPage.jsx";
import InstitutionsPage from "./pages/Admin/InstitutionsPage.jsx";
import { Toaster, CheckmarkIcon, ErrorIcon } from "react-hot-toast";
// components

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="bottom-right"
        containerStyle={{
          zIndex: 200000
        }}
        toastOptions={{
          success: {
            style: {
              background: "white",
              maxWidth: "500px",
            },
            icon: <CheckmarkIcon />,
          },
          error: {
            style: {
              background: "white",
              maxWidth: "500px",
            },
            icon: <ErrorIcon />,
          },
        }}
      />
      <ThemeProvider>
        <ReportsProvider>
          <Router basename="/" future={{ v7_startTransition: true }}>
            <Routes>
              <Route element={<DashboardLayout />}>
                <Route path="/cenco-dashboard" element={<CencoPage />} />
                <Route
                  path="/supervisor-dashboard"
                  element={<SupervisorPage />}
                />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/reports-map" element={<ReportsMapPage />} />
                <Route path="/reports/:id" element={<ReportDetailPage />} />
                <Route path="/statistics" element={<StatisticsPage />} />
                <Route path="/admin" element={<AdminPage />}>
                  <Route index element={<AccountsPage />} />
                  <Route path="accounts" element={<AccountsPage />} />
                  <Route path="situations" element={<SituationsPage />} />
                  <Route path="institutions" element={<InstitutionsPage />} />
                </Route>
              </Route>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/404" element={<Error404 />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </Router>
        </ReportsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
