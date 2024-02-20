import { handleNullValue, priceFormatter } from "./helpers";

// const numColWidth = "30%";
// const nameColWidth = "20%";

const columns = [
  {
    dataField: "hour",
    caption: "Hour",
    width: "auto",
    alignment: "center",
    customizeText: ({ value }) =>
      Number(value) < 10 ? "0" + value + ":00" : value + ":00",
  },
  {
    dataField: "soldQuantity",
    caption: "Sales Quantity",
    width: "auto",
    alignment: "center",
    customizeText: ({ value }) => parseInt(value).toLocaleString(),
  },
  {
    dataField: "noOfSales",
    caption: "No. of Sales",
    width: "auto",
    alignment: "center",
    customizeText: ({ value }) => parseInt(value).toLocaleString(),
  },
  {
    dataField: "netTotal",
    caption: "Net Sales total",
    width: "auto",
    alignment: "center",
    calculateCellValue: (rowData) => handleNullValue(rowData.netTotal),
    customizeText: ({ value }) => priceFormatter(value),
  },
  {
    dataField: "gstTotal",
    caption: "GST 10%",
    width: "auto",
    alignment: "center",
    customizeText: ({ value }) => priceFormatter(value),
  },
  {
    dataField: "salesWithGST",
    caption: "Sales total with GST",
    width: "auto",
    alignment: "center",
    customizeText: ({ value }) => priceFormatter(value),
  },
  {
    dataField: "discountTotal",
    caption: "Net Discount Total",
    width: "auto",
    alignment: "center",
    customizeText: ({ value }) => priceFormatter(value),
  },
  {
    dataField: "discountPercent",
    caption: "Discount %",
    width: "auto",
    alignment: "center",
    customizeText: ({ value }) => value.toLocaleString() + "%",
  },
];

export const summaryRow = [
  "noOfSales",
  "netTotal",
  "salesWithGST",
  "discountTotal",
  "soldQuantity",
  "gstTotal",
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
