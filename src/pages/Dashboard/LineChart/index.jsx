import { Line } from "react-chartjs-2";
import { PropTypes } from "prop-types";
import {
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";
import { Box } from "@mui/material";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

const generateArrayOfNumber = (n) =>
  Array(n)
    .fill()
    .map((_, index) => index + ":00");

const LineChart = ({ data, yAxisName }) => {
  const data1 = {
    labels: generateArrayOfNumber(24),
    datasets: [
      {
        label: "Net-Sales",
        data: data,
        fill: false,
        backgroundColor: "rgba(255,0,0,1.0",
        borderColor: "rgba(255,0,0,0.2)",
        tension: 0,
      },
    ],
  };

  return (
    <Box width={"1000px"} height={"350px"}>
      <Line
        data={data1}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: yAxisName,
                font: {
                  size: 16,
                  weight: "bold",
                },
              },
            },

            x: {
              title: {
                display: true,
                text: "Time",
                font: {
                  size: 16,
                  weight: "bold",
                  color: "black", //navy
                },
              },
            },
          },

          plugins: {
            tooltip: { enabled: true, position: "nearest" },
            title: {
              display: true,
              text: "fig. Sales Line Chart",
              color: "grey",
              position: "bottom",
              align: "center",
              font: {
                weight: "bold",
                size: 20,
              },
              padding: { top: 45, left: 0, right: 0, bottom: 0 },
            },
            legend: {
              display: true,
              labels: {
                color: "rgb(255, 99, 132)",
              },
            },
          },
        }}
        height={"1.5"}
        width={"3"}
      />
    </Box>
  );
};

LineChart.propTypes = {
  data: PropTypes.array,
  yAxisName: PropTypes.string,
};

export default LineChart;
