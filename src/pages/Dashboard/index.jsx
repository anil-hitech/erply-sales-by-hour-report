import { useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import * as htmlToImage from "html-to-image";
// import ReactToPrint from "react-to-print";

// import { data } from "./data";
import Table from "./Table";
import LineChart from "./LineChart";
import SelectorRadioGroup from "../../components/SelectorRadioGroup";
import { useAppContext } from "../../context/AppContext";

const chartOptions = ["Net Sales", "Net Sales (with GST)", "No. of Sales"];

const Dashboard = () => {
  const [selectChart, setSelectChart] = useState("Net Sales");
  const boxRef = useRef();

  const {
    data: { salesData },
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
      };

      salesData.map((row) => {
        newData.data[Number(row.hour) - Number(salesData[0].hour)] =
          row?.[fieldName];
      });
      return newData;
    } else return {};
  };

  const handleDownload = () => {
    // htmlToImage
    //   .toPng(boxRef.current)
    //   .then(async function (dataUrl) {
    //     const doc = new jsPDF({
    //       compress: false,
    //       orientation: "portrait",
    //       unit: "px",
    //     });
    //     await doc.addImage(dataUrl, "PNG", 0, 0, 500, 500);
    //     doc.save("erplyChart.pdf");
    //   })
    //   .catch(function (error) {
    //     console.error("oops, something went wrong!", error);
    //   });

    html2canvas(boxRef.current)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("erplyChart.pdf");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Button
        variant="outlined"
        onClick={handleDownload}
        sx={{ alignSelf: "flex-end", marginRight: "280px" }}
      >
        PDF
      </Button>
      {/* <ReactToPrint
        bodyClass="print-agreement"
        content={() => boxRef.current}
        trigger={() => (
          <Button
            variant="outlined"
            onClick={handleDownload}
            sx={{ alignSelf: "flex-end", marginRight: "280px" }}
          >
            PDF
          </Button>
        )}
      /> */}
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"30px"}
        alignItems={"center"}
        ref={boxRef}
        padding={"30px"}
        paddingTop={"10px"}
      >
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
      </Box>
    </Box>
  );
};

export default Dashboard;
