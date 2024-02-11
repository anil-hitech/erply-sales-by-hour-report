import { useState } from "react";
import { DataGrid, LoadPanel } from "devextreme-react";
import tableColumns, { summaryRow } from "./tableColumns";
import "devextreme/dist/css/dx.light.css";
import {
  Column,
  FilterRow,
  Scrolling,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";

import { priceFormatter } from "./helpers";
import { data } from "../data";

const Table = () => {
  const [isLoading] = useState(false);

  let columns = [];

  const excludedColumns = ["orderedQty"];
  columns = tableColumns.filter(
    (col) => !excludedColumns.includes(col.dataField) //removing unnecessary columns for lineItem type
  );

  return (
    <div>
      {isLoading ? (
        <LoadPanel
          shadingColor="rgba(0,0,0,0.4)"
          visible={isLoading}
          showIndicator={true}
          shading={true}
        />
      ) : (
        data && (
          <>
            <DataGrid
              width={"100%"}
              // height={"600px"}
              dataSource={data}
              showBorders={true}
              columns={columns}
              allowColumnResizing={true}
              rowAlternationEnabled={true}
            >
              {columns.map((column, index) => (
                <Column key={index} {...column} />
              ))}
              <FilterRow visible={true} />

              <Summary>
                {summaryRow.map((col, index) => (
                  <TotalItem
                    key={index}
                    column={col}
                    summaryType="sum"
                    displayFormat={(value) =>
                      [
                        "gst",
                        "netSalesTotal",
                        "netSalesTotalGST",
                        "netDiscountTotal",
                      ].includes(col)
                        ? priceFormatter(value)
                        : parseInt(value).toLocaleString()
                    } // Optional formatting
                  />
                ))}
              </Summary>

              <Scrolling rowRenderingMode="virtual" />
            </DataGrid>
          </>
        )
      )}
    </div>
  );
};

export default Table;
