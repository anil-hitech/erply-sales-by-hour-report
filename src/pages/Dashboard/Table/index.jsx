import { DataGrid } from "devextreme-react";
import tableColumns, { excludedColumns, summaryRow } from "./tableColumns";
import "devextreme/dist/css/dx.light.css";
import {
  FilterRow,
  Scrolling,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";

import { priceFormatter } from "./helpers";
// import { data } from "../data";
import { useAppContext } from "../../../context/AppContext";

const Table = () => {
  const {
    data: { salesData },
  } = useAppContext();

  let columns = [];

  columns = tableColumns.filter(
    (col) => !excludedColumns.includes(col.dataField) //removing unnecessary columns for lineItem type
  );

  return (
    <div>
      <DataGrid
        width={"100%"}
        // height={"500px"}
        className="salesTable"
        dataSource={salesData || []}
        showBorders={true}
        columns={columns}
        allowColumnResizing={true}
        rowAlternationEnabled={true}
        paging={{ pageSize: 25 }}
      >
        {/* {columns.map((column, index) => (
          <Column key={index} {...column} />
        ))} */}
        <FilterRow visible={true} />
        <Scrolling mode="virtual" />

        <Summary>
          {summaryRow.map((col, index) => (
            <TotalItem
              key={index}
              column={col}
              summaryType="sum"
              displayFormat={(value) =>
                [
                  "netTotal",
                  "salesWithGST",
                  "discountTotal",
                  "gstTotal",
                ].includes(col)
                  ? priceFormatter(value)
                  : parseInt(value).toLocaleString()
              } // Optional formatting
            />
          ))}
        </Summary>
      </DataGrid>
    </div>
  );
};

export default Table;
