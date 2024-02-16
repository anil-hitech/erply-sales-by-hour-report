import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
import PropTypes from "prop-types";
import { endpoints } from "../api/endpoints";

const AppContext = createContext();

const initialFilters = {
  locationID: "",
  fromDate: "",
  toDate: "",
};

const initialSalesDetail = {
  HOUR: "00:00",
  netSalesTotal: "3739.92",
  gstTotal: "373.98",
  netSalesTotalWithGst: "4113.90",
  totalQty: "10.00",
  totalSalesDiscount: "0.00000000",
  numberOfSales: 1,
};

const AppContextProvider = ({ children }) => {
  const [salesData, setSalesData] = useState([initialSalesDetail]);
  const [filters, setFilters] = useState(initialFilters);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState();

  //fetching re for dashboard
  const getSalesData = async () => {
    const from = filters.fromDate;
    const to = filters.toDate;
    setIsLoading(true);
    await api
      .get(endpoints.getSalesByHours, {
        params: {
          formData: from,
          toDate: to,
        },
      })
      .then((res) => {
        setSalesData(res.data.records.salesData);

        const list = res.data.records.warehouseList;
        const locataionsNames = Object.keys(res.data.records.warehouseList);
        setLocations(
          locataionsNames.map((loc) => ({ id: list[loc], name: loc }))
        );
      })
      .catch();
    setIsLoading(false);
  };

  useEffect(() => {
    clearInterval(timer);
    getSalesData();
    const newInterval = setInterval(() => getSalesData(), 3 * 60 * 1000);
    setInterval(newInterval);
    setTimer(newInterval);
  }, [filters]);

  // useEffect(() => console.log("data", salesData), [salesData]);

  return (
    <AppContext.Provider
      value={{
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
