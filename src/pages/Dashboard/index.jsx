import { useState } from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";

// import { data } from "./data";
import Table from "./Table";
import LineChart from "./LineChart";
import SelectorRadioGroup from "../../components/SelectorRadioGroup";
import { useAppContext } from "../../context/AppContext";
import LoadPanel from "devextreme-react/load-panel";
const chartOptions = ["Net Sales with GST", "Customer Count"];

const Dashboard = () => {
  const [selectChart, setSelectChart] = useState(chartOptions[0]);
  const [showGstInMobile, setShowGstInMobile] = useState(true);

  const {
    data: { salesData, isLoading },
    chartRef,
  } = useAppContext();

  //generates 24 data and fills 0 for undefined array value
  const dataGenerator = (fieldName) => {
    if (salesData.length !== 0) {
      const arrLen = salesData?.length;
      const newArrLen =
        Number(salesData[arrLen - 1].hour) - Number(salesData[0].hour) + 1;

      const newData = {
        data: Array(isNaN(newArrLen) ? 0 : newArrLen).fill(0),
        startingPoint: Number(salesData[0].hour),
        lastPoint: Number(salesData[salesData.length - 1].hour),
      };

      salesData.map((row) => {
        newData.data[Number(row.hour) - Number(salesData[0].hour)] =
          row?.[fieldName];
      });
      return newData;
    } else return {};
  };

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <LoadPanel
        shadingColor="rgba(0,0,0,0.4)"
        visible={isLoading}
        showIndicator={true}
        shading={true}
        showPane={true}
      />

      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"15px"}
        alignItems={"center"}
        ref={chartRef}
        padding={{ xs: "0px", sm: "30px" }}
        paddingTop={"10px"}
      >
        <Table />
        <Box
          width={{ xs: "100%", md: "800px", lg: "1000px" }}
          height={{ xs: "400px", md: "350px" }}
          id="reportChart"
        >
          {selectChart === chartOptions[0] && (
            <LineChart
              data={dataGenerator("salesWithGST")}
              yAxisName="Net Sales (AUD)"
              chartName={chartOptions[0]}
            />
          )}

          {selectChart === chartOptions[1] && (
            <LineChart
              data={dataGenerator("noOfSales")}
              yAxisName="No. of Sales"
              chartName={chartOptions[1]}
            />
          )}

          <SelectorRadioGroup
            options={chartOptions}
            state={selectChart}
            setState={setSelectChart}
          />
          <FormControlLabel
            sx={{ position: "relative", bottom: "17px" }}
            control={
              <Checkbox
                checked={showGstInMobile}
                onChange={() => {
                  setShowGstInMobile((prev) => !prev);
                }}
                name="jason"
              />
            }
            label="Display Sales total with GST in Table (working on this)"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
