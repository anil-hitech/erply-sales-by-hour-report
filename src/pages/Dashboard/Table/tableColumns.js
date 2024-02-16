import { handleNullValue, priceFormatter } from "./helpers";

// const numColWidth = "30%";
// const nameColWidth = "20%";

const columns = [
  {
    dataField: "hour",
    caption: "Hour",
    width: "100",
    alignment: "center",
    customizeText: ({ value }) => value + ":00",
  },
  {
    dataField: "totalQty",
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
    dataField: "gstTotal",
    caption: "GST 10%",
    width: "200",
    alignment: "center",
    customizeText: ({ value }) => priceFormatter(value),
  },
  {
    dataField: "netSalesTotalWithGst",
    caption: "Net Sales total(GST)",
    width: 250,
    alignment: "center",
    customizeText: ({ value }) => priceFormatter(value),
  },
  {
    dataField: "totalSalesDiscount",
    caption: "Net Discount Total",
    width: 200,
    alignment: "center",
    customizeText: ({ value }) => priceFormatter(value),
  },
  {
    dataField: "numberOfSales",
    caption: "Number of Sales",
    width: 150,
    alignment: "center",
    customizeText: ({ value }) => parseInt(value).toLocaleString(),
  },
];

export const summaryRow = [
  "totalQty",
  "gstTotal",
  "netSalesTotal",
  "netSalesTotalWithGst",
  "totalSalesDiscount",
  "numberOfSales",
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
