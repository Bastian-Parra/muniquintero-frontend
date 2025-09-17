import { useState, useEffect } from "react";
import StatisticsAPI from "../../api/statistics.js";
import { Doughnut } from "react-chartjs-2";
import { truncateText } from "../../utils/utils.js";

const FilteredReportsChart = ({ selectedDay, selectedShift }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8AC24A",
          "#FF834A",
          "#9fbf52",
          "#607D8B",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchFilteredReports = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const reports = await StatisticsAPI.getFilteredReports(
          selectedDay,
          selectedShift
        );

        let situations = reports.map((report) =>
          truncateText(report.situation, 30)
        );
        let counts = reports.map((report) => report.count);

        setChartData({
          labels: situations,
          datasets: [
            {
              label: `Cantidad de Reportes (${selectedShift})`,
              data: counts,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#8AC24A",
                "#FF834A",
                "#9fbf52",
                "#607D8B",
              ],
              borderColor: "#fff",
              borderWidth: 1,
              hoverOffset: 10,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching filtered reports: ", error);
        setError("Error al cargar los datos");
        setChartData({
          labels: ["Error"],
          datasets: [
            {
              label: "Error",
              data: [1],
              backgroundColor: ["#FF0000"],
            },
          ],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredReports();
  }, [selectedDay, selectedShift]);

  return (
    <Doughnut
      style={{ maxHeight: "470px" }}
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: `Distribución de Reportes - ${selectedShift}`,
            font: {
              size: 16,
            },
          },
          legend: {
            position: "right",
            labels: {
              boxWidth: 12,
              padding: 20,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.raw || 0;
                const total = context.dataset.data.reduce(
                  (acc, data) => acc + data,
                  0
                );
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
        cutout: "60%",
        maintainAspectRatio: false,
        responsive: true,
      }}
    />
  );
};

export default FilteredReportsChart;
