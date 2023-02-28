import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
const BarChartResponse = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const chartData = {
      labels: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      datasets: [
        {
          label: "Question 1",
          data: [10, 20, 30, 40, 50],
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
            size: 30,
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

    const myChart = new Chart(canvasRef.current, {
      type: "bar",
      data: chartData,
      options: chartOptions,
      plugins: [ChartDataLabels],
    });

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
