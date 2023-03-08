import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
const BarChartResponse = ({ title, labels, data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Chart options and data
    const chartData = {
      labels,
      datasets: [
        {
          label: title,
          data,
        },
      ],
    };

    const chartOptions = {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 20,
            },
          },
        },
        datalabels: {
          align: "end",
          anchor: "end",
          font: {
            size: 20,
          },
          formatter: function (value, context) {
            return value;
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Chart instance with canvasRef, data and options
    const myChart = new Chart(canvasRef.current, {
      type: "bar",
      data: chartData,
      options: chartOptions,
      plugins: [ChartDataLabels],
    });

    // Clean up chart instance on unmount
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} />
    </div>
  );
};

const styles = {
  container: {
    width: "50%",
    marginBottom: "1rem",
  },
};
export default BarChartResponse;
