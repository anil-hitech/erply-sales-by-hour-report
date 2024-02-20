import { createContext, useContext, useEffect, useRef, useState } from "react";
import api from "../api";
import PropTypes from "prop-types";
import { endpointsNew } from "../api/endpoints";

const AppContext = createContext();

const initialFilters = {
  locationID: "",
  fromDate: "",
  toDate: "",
};

// const initialSalesDetail = {
//   HOUR: "00",
//   netSalesTotal: "0",
//   gstTotal: "0",
//   netSalesTotalWithGst: "0",
//   totalQty: "0",
//   totalSalesDiscount: "0",
//   numberOfSales: 0,
// };

const AppContextProvider = ({ children }) => {
  const [salesData, setSalesData] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState();
  const chartRef = useRef();

  //fetching re for dashboard
  const getSalesData = async () => {
    const from = filters.fromDate;
    const to = filters.toDate;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("fromDate", from);
    formData.append("toDate", to);
    formData.append(
      "clientCode",
      JSON.parse(localStorage?.getItem("clientDetail"))["clientCode"]
    );

    if (filters.locationID !== "")
      filters.locationID?.map((location, index) =>
        formData.append(`selectedWarehouse[${index}]`, location.value)
      );

    await api
      .post(endpointsNew.getSalesByHour, formData)
      .then((res) => {
        setSalesData(
          res.data.data.sort((a, b) => Number(a.hour) - Number(b.hour))
        );

        // const list = res.data.warehouseDetail;
        // const locataionsNames = Object.keys(res.data.records.warehouseList);
        // setLocations(
        //   locataionsNames.map((loc) => ({ id: list[loc], name: loc }))
        // );

        setLocations(res.data.warehouseDetail);
      })
      .catch();
    setIsLoading(false);
  };

  useEffect(() => {
    clearInterval(timer);
    getSalesData();
    const newInterval = setInterval(() => getSalesData(), 24 * 60 * 60 * 1000);
    setInterval(newInterval);
    setTimer(newInterval);
  }, [filters]);

  return (
    <AppContext.Provider
      value={{
        chartRef,
        locations,
        data: { salesData, isLoading },
        filters: {
          filters,
          setFilters,
          initialFilters,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
