import { handleNullValue, priceFormatter } from "./helpers";

// const numColWidth = "30%";
// const nameColWidth = "20%";

const columnsMobile = [
  {
    dataField: "hour",
    caption: "Hour",
    width: "50px",
    alignment: "center",
    customizeText: ({ value }) => value + ":00",
  },
  {
    dataField: "soldQuantity",
    caption: "Item Sold",
    width: "80px",
    alignment: "center",
    customizeText: ({ value }) => parseInt(value).toLocaleString(),
  },
  {
    dataField: "noOfSales",
    caption: "Customer Count",
    width: "80px",
    alignment: "center",
    customizeText: ({ value }) => parseInt(value).toLocaleString(),
  },
  {
    dataField: "netSalesTotal",
    caption: "Net Sales total",
    width: "auto",
    alignment: "center",
    calculateCellValue: (rowData) => handleNullValue(rowData.netSalesTotal),
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

// export const excludedColumns = ["gstTotal", "discountTotal", "discountPercent"];

export default columnsMobile;

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
