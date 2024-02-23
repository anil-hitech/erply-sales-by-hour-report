import { createContext, useContext, useEffect, useRef, useState } from "react";
import api from "../api";
import PropTypes from "prop-types";
import { endpointsNew } from "../api/endpoints";
import formatDate from "../utilities/formatDate";

const AppContext = createContext();

const initialFilters = {
  locationID: "",
  fromDate: formatDate(new Date()),
  toDate: formatDate(new Date()),
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
  const queryParams = new URLSearchParams(window.location.search);

  const [clientCode, setClientCode] = useState(queryParams.get("clientCode"));
  const [sessionKey, setSessionKey] = useState(queryParams.get("sessionKey"));
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
    formData.append("clientCode", clientCode);
    formData.append("sessionKey", sessionKey);

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

        setLocations(res.data.warehouseDetail);
      })
      .catch((err) => console.log(err.message));
    setIsLoading(false);
  };

  useEffect(() => {
    if (Number(clientCode) > 0) {
      clearInterval(timer);
      getSalesData();
      const newInterval = setInterval(
        () => getSalesData(),
        24 * 60 * 60 * 1000
      );
      setInterval(newInterval);
      setTimer(newInterval);
    } else {
      setIsLoading(false);
    }
  }, [filters, clientCode]);

  // useEffect(() => {
  //   console.log("sesionKey", sessionKey);
  //   console.log("clientCode", clientCode);
  // }, [sessionKey, clientCode]);

  return (
    <AppContext.Provider
      value={{
        client: { clientCode, sessionKey, setSessionKey, setClientCode },
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
