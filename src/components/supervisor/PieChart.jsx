import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import StatisticsAPI from "../../api/statistics.js";

const PieChart = ({ selectedSituation }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          await StatisticsAPI.getFilteredReportsByShiftAndSituation();
        setChartData(response);
      } catch (error) {
        console.error("Error fetching chart data ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const createChartData = (situation) => {
    if (!chartData[situation]) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const data = chartData[situation];
    const hasData = data.MAÑANA || data.TARDE || data.NOCHE || data.MADRUGADA;

    if (!hasData) {
      return {
        labels: [],
        datasets: [],
      };
    }

    return {
      labels: ["MAÑANA", "TARDE", "NOCHE", "MADRUGADA"],
      datasets: [
        {
          data: [
            data.MAÑANA || 0,
            data.TARDE || 0,
            data.NOCHE || 0,
            data.MADRUGADA || 0,
          ],
          backgroundColor: ["#F17A12", "#A3D5FF", "#6EC40C", "#0C6EC4"],
          hoverBackgroundColor: ["#F17A12", "#A3D5FF", "#6EC40C", "#0C6EC4"],
        },
      ],
    };
  };

  if (isLoading) {
    return <div>Cargando datos...</div>;
  }

  if (!selectedSituation) {
    return (
      <div id="select-situation-msg">
        Selecciona una situación para ver el gráfico.
      </div>
    );
  }

  const data = createChartData(selectedSituation);

  if (!data.labels.length) {
    return (
      <div id="select-situation-msg">
        No hay datos disponibles para la situación seleccionada.
      </div>
    );
  }

  return (
    <div className="chart-pie-container">
      <div style={{ marginBottom: "150px", width: "300px", height: "300px" }}>
        <h3>{selectedSituation}</h3>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default PieChart;
