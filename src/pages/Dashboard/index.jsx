import { Box, Stack } from "@mui/material";
import Table from "./Table";
import LineChart from "./LineChart";
import { data } from "./data";
import { useState } from "react";
import SelectorRadioGroup from "../../components/SelectorRadioGroup";

const chartOptions = ["Net Sales", "Net Sales (with GST)", "No. of Sales"];

const Dashboard = () => {
  const [selectChart, setSelectChart] = useState("Net Sales");

  //generates 24 data and fills 0 for undefined array valuek
  const dataGenerator = (fieldName) => {
    const newData = Array(24).fill(0);
    data.map((row) => {
      newData[row.hour] = row?.[fieldName];
    });
    return newData;
  };

  return (
    <Stack gap={"30px"}>
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
          />
        )}

        {selectChart === chartOptions[1] && (
          <LineChart
            data={dataGenerator("netSalesTotalGST")}
            yAxisName="No. of Sales"
          />
        )}

        {selectChart === chartOptions[2] && (
          <LineChart
            data={dataGenerator("noOfSales")}
            yAxisName="No. of Sales"
          />
        )}
      </Box>
    </Stack>
  );
};

export default Dashboard;
