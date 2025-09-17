import "../assets/styles/stats.css";
import { useState, useEffect } from "react";
import { useReports } from "../contexts/ReportsContext.jsx";
import { useFetchStatistics } from "../utils/fetchStatistics.js";
import ContainerSection from "../components/ContainerSection.jsx";
import { Chart, registerables } from "chart.js";
import { Toaster } from "react-hot-toast";
import GeneralStats from "../components/supervisor/GeneralStats.jsx";
import WeeklyChart from "../components/supervisor/WeeklyChart.jsx";
import MonthlyChart from "../components/supervisor/MonthlyChart.jsx";
import FilteredReportsChart from "../components/supervisor/FilteredReportsChart.jsx";
import ReportFilters from "../components/supervisor/ReportFilters.jsx";
import PieChart from "../components/supervisor/PieChart.jsx";
import SituationMenu from "../components/supervisor/SituationMenu.jsx";
import MostCommonSituations from "../components/supervisor/MostCommonSituations.jsx";
import { useWeeklyStats } from "../hooks/useWeeklyStats.js";

Chart.register(...registerables);

function SupervisorPage() {
  const { dailyCount, weeklyCount, monthlyCount, weeklyStats, monthlyStats } =
    useFetchStatistics();
  const { reportsCount } = useReports();
  const { currentWeekData, lastWeekData, loading, error } = useWeeklyStats();
  const [selectedDay, setSelectedDay] = useState("Lunes");
  const [selectedShift, setSelectedShift] = useState("MAÑANA");
  const [selectedSituation, setSelectedSituation] = useState("");
  const [situationDetails, setSituationDetails] = useState("");
  const [toastShown, setToastShown] = useState(false);

  const openModal = (situation) => {
    setSelectedSituation(situation);
    setSituationDetails(`Detalles sobre la situación ${situation}`);
  };

  return (
    <>
      <ContainerSection>
        <div className="supervisor-page">
          <div className="container-general-stats">
            <div className="general-stats-inside">
              <GeneralStats
                dailyCount={dailyCount}
                weeklyCount={weeklyCount}
                monthlyCount={monthlyCount}
                reportsCount={reportsCount}
              />
              <MostCommonSituations />
            </div>
            <WeeklyChart
              currentWeekData={currentWeekData}
              lastWeekData={lastWeekData}
              isLoading={loading}
              error={error}
              className="weekly-chart"
            />
          </div>
          <div className="container-charts">
            <div className="pie-chart-container">
              <SituationMenu onSituationSelect={openModal} />
              <PieChart
                selectedSituation={selectedSituation}
                onSituationSelect={openModal}
              />
            </div>
            <div className="filtered-container">
              <ReportFilters
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                selectedShift={selectedShift}
                setSelectedShift={setSelectedShift}
              />
              <FilteredReportsChart
                selectedDay={selectedDay}
                selectedShift={selectedShift}
              />
            </div>
          </div>
          <MonthlyChart data={monthlyStats} />
        </div>
      </ContainerSection>
    </>
  );
}

export default SupervisorPage;
