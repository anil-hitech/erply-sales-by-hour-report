import { DataGrid } from "devextreme-react";
import tableColumns, { excludedColumns, summaryRow } from "./tableColumns";
import tableColumnsMobile from "./tableColumnsMobile";
import "devextreme/dist/css/dx.light.css";
import {
  FilterRow,
  Scrolling,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";
import PropTypes from "prop-types";

import { priceFormatter } from "./helpers";
// import { data } from "../data";
import { useAppContext } from "../../../context/AppContext";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const Table = ({ showGSTMobile }) => {
  const [excludedColumnsList, setExcludedColumnsList] =
    useState(excludedColumns);
  const {
    data: { salesData },
  } = useAppContext();

  const excludeColumnsFunc = (array) => {
    return array.filter(
      (col) => !excludedColumnsList.includes(col.dataField) //removing unnecessary columns for lineItem type
    );
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    matches
      ? setColumns(excludeColumnsFunc(tableColumnsMobile))
      : setColumns(excludeColumnsFunc(tableColumns));
  }, [matches]);

  useEffect(() => {
    // matches &&
    //   (showGSTMobile ? setExcludedColumnsList(prev()) : setExcludedColumnsList());
  }, [showGSTMobile]);

  return (
    <Box
      id="reportTable"
      width={{ xs: "90vw", md: "flex-basis" }}
      sx={{
        display: { sx: "block", md: "flex" },
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
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
        <Scrolling />

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
    </Box>
  );
};

Table.propTypes = {
  showGSTMobile: PropTypes.bool,
};

export default Table;
