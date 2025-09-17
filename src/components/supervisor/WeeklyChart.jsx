import { Bar, Line } from "react-chartjs-2";
import { generateWeeklyChartData } from "../../utils/Chart.js";
import "../../assets/styles/stats.css";

function WeeklyChart({ currentWeekData, lastWeekData, isLoading, error }) {
  if (isLoading) return <div>Cargando datos...</div>;
  if (error) return <div>Error al cargar los datos</div>;
  if (!currentWeekData || !lastWeekData) return null;

  return (
    <div className="weekly-chart-container">
      <h1>Comparación semanal</h1>
      <Bar
        data={generateWeeklyChartData(currentWeekData, lastWeekData)}
        options={{
          plugins: {
            legend: { position: "top" },
            tooltip: { mode: "index", intersect: false },
          },
          responsive: true,
          maintainAspectRatio: false,
          barThickness: 20,
        }}
      />
    </div>
  );
}

export default WeeklyChart;
