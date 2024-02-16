import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import jsPDF from "jspdf";

// import { data } from "./data";
import Table from "./Table";
import LineChart from "./LineChart";
import SelectorRadioGroup from "../../components/SelectorRadioGroup";
import { useAppContext } from "../../context/AppContext";

const chartOptions = ["Net Sales", "Net Sales (with GST)", "No. of Sales"];

const Dashboard = () => {
  const [selectChart, setSelectChart] = useState("Net Sales");

  const {
    data: { salesData },
  } = useAppContext();

  //generates 24 data and fills 0 for undefined array value
  const dataGenerator = (fieldName) => {
    const newData = Array(24).fill(0);
    salesData.map((row) => {
      newData[row.hour] = row?.[fieldName];
    });
    return newData;
  };

  const handleDownload = () => {};

  return (
    <Stack gap={"30px"} alignItems={"center"}>
      <Button variant="outlined" onClick={handleDownload}>
        Download
      </Button>
      <Table />
      <Box>
        <SelectorRadioGroup
          options={chartOptions}
          state={selectChart}
          setState={setSelectChart}
        />
        {selectChart === chartOptions[0] && (
          <LineChart
            data={dataGenerator("netSalesTotal")}
            yAxisName={"Net Sales (AUD)"}
            chartName={chartOptions[0]}
          />
        )}

        {selectChart === chartOptions[1] && (
          <LineChart
            data={dataGenerator("netSalesTotalWithGst")}
            yAxisName="Net Sales (AUD)"
            chartName={chartOptions[1]}
          />
        )}

        {selectChart === chartOptions[2] && (
          <LineChart
            data={dataGenerator("numberOfSales")}
            yAxisName="No. of Sales"
            chartName={chartOptions[2]}
          />
        )}
      </Box>
    </Stack>
  );
};

export default Dashboard;
