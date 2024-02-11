import { handleNullValue, priceFormatter } from "./helpers";

// const numColWidth = "30%";
// const nameColWidth = "20%";

const columns = [
  {
    dataField: "hour",
    caption: "Hour",
    width: "50",
    alignment: "center",
  },
  {
    dataField: "salesQty",
    caption: "Sales Quantity",
    width: "150",
    alignment: "center",
    customizeText: ({ value }) => parseInt(value).toLocaleString(),
  },
  {
    dataField: "netSalesTotal",
    caption: "Net Sales total",
    width: "250",
    alignment: "center",
    calculateCellValue: (rowData) => handleNullValue(rowData.netSalesTotal),
    customizeText: ({ value }) => priceFormatter(value),
  },
  {
    dataField: "gst",
    caption: "GST 10%",
    width: "200",
    alignment: "center",
    customizeText: ({ value }) => priceFormatter(value),
  },
  {
    dataField: "netSalesTotalGST",
    caption: "Net Sales total GST",
    width: 250,
    alignment: "center",
    customizeText: ({ value }) => priceFormatter(value),
  },
  {
    dataField: "netDiscountTotal",
    caption: "Net Discount Total",
    width: 200,
    alignment: "center",
    customizeText: ({ value }) => priceFormatter(value),
  },
  {
    dataField: "noOfSales",
    caption: "Number of Sales",
    width: 150,
    alignment: "center",
    customizeText: ({ value }) => parseInt(value).toLocaleString(),
  },
];

export const summaryRow = [
  "salesQty",
  "gst",
  "netSalesTotal",
  "netSalesTotalGST",
  "netDiscountTotal",
  "noOfSales",
];

export default columns;

//some fields to rem:
//   calculateCellValue: (rowData) => handleNullValue(rowData.received),
// customizeText: (data) => data.value.toLocaleString(),
// flex:1,
// dataType: "number",
// format: {
//   type: "currency",
//   precision: 2,
// },
// cellTemplate: (cellElement, cellInfo) => {
//   cellElement.style.cursor = "pointer";
//   return { ...cellElement, cellInfo };
// },
