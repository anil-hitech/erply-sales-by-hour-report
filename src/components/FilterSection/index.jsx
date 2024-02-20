/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";

import {
  Box,
  Button,
  // FormControl,
  // FormLabel,
  // InputLabel,
  // MenuItem,
} from "@mui/material";
import { DateBox } from "devextreme-react";
import Select from "react-select";

import { useAppContext } from "../../context/AppContext";
import formatDate from "../../utilities/formatDate";

const FilterSection = () => {
  const {
    locations,
    filters: { filters, setFilters, initialFilters },
  } = useAppContext();
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilter = useCallback(() => {
    setFilters(localFilters);
  }, [localFilters]);

  return (
    <Box
      // position={"absolute"}
      width={"100%"}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"20px"}
      alignSelf={"center"}
      flexWrap={"wrap"}
      py="10px"
    >
      {/* <FormControl>
        <InputLabel size="small" id="demo-simple-select-label">
          Location Filter
        </InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={localFilters.locationID}
          label="Location Filter"
          onChange={(e) =>
            setLocalFilters((prev) => ({
              ...prev,
              locationID: e?.target.value,
            }))
          }
          sx={{ width: "300px" }}
        >
          <MenuItem value="">None</MenuItem>
          {locations?.map((location, index) => (
            <MenuItem value={location.id} key={index}>
              {location.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

      <Select
        id="location"
        isMulti
        options={locations.map((loc) => ({ value: loc.id, label: loc.name }))}
        onChange={(value) => console.log("selectedValue", value)}
        styles={{
          control: (baseStyles) => {
            // console.log("baseSTyles", baseStyles);
            // console.log("state", state);
            return {
              ...baseStyles,

              width: 500,
              wordWrap: "break-word",
            };
          },

          option: (baseStyles) => ({
            ...baseStyles,
            color: "black",
          }),

          multiValue: (baseStyles) => ({
            ...baseStyles,
            flex: "1 0 auto",
            backgroundColor: "white",
            border: "1px solid silver",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }),
          multiValueRemove: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "salmon",
            margin: "2px",
            cursor: "pointer",
          }),

          valueContainer: (baseStyles) => ({
            ...baseStyles,
            overflowX: "auto",
            flexWrap: "nowrap",
            scrollbarWidth: 0,
          }),
        }}
        option
      />

      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        <label style={{ width: "50px", color: "black", opacity: 0.7 }}>
          From :
        </label>
        <DateBox
          width={"150px"}
          placeholder="dd/mm/yyyy"
          value={
            localFilters.fromDate !== ""
              ? new Date(localFilters.fromDate)
              : null
          }
          onValueChange={(value) => {
            setLocalFilters((prev) => ({
              ...prev,
              fromDate: formatDate(value),
            }));
          }}
          type="date"
          displayFormat="dd/MM/yyyy"
        />
      </Box>

      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        <label style={{ width: "50px", color: "black", opacity: 0.7 }}>
          To :
        </label>
        <DateBox
          width={"150px"}
          placeholder="dd/mm/yyyy"
          value={
            localFilters.toDate !== "" ? new Date(localFilters.toDate) : null
          }
          onValueChange={(value) => {
            setLocalFilters((prev) => ({
              ...prev,
              toDate: formatDate(value),
            }));
          }}
          type="date"
          displayFormat="dd/MM/yyyy"
        />
      </Box>
      <Box display={"flex"} justifyContent={"center"} gap={"10px"}>
        <Button
          variant="contained"
          sx={{ width: "120px" }}
          onClick={handleFilter}
        >
          Filter
        </Button>

        <Button
          variant="contained"
          color="warning"
          sx={{ width: "120px" }}
          onClick={() => {
            setLocalFilters(initialFilters);
            setFilters(initialFilters);
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default FilterSection;
