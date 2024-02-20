import { Line } from "react-chartjs-2";
import { PropTypes } from "prop-types";
import {
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Box } from "@mui/material";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const generateArrayOfNumber = () =>
  Array(24)
    .fill()
    .map((_, index) => index + ":00");

const LineChart = ({ data, yAxisName, chartName }) => {
  // console.log("data", data);
  const data1 = {
    labels: generateArrayOfNumber().slice(
      data.startingPoint,
      data.data?.length
    ),
    datasets: [
      {
        label: "Net-Sales($)",
        data: data?.data,
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
              text: `${chartName} Line Chart`,
              color: "grey",
              position: "bottom",
              align: "center",
              font: {
                weight: "bold",
                size: 20,
              },
              padding: { top: 5 },
            },
            legend: {
              display: true,
              labels: {
                color: "black",
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
  data: PropTypes.object,
  yAxisName: PropTypes.string,
  chartName: PropTypes.string,
};

export default LineChart;
