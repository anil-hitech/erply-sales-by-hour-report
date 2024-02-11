import AppDrawer from "../components/AppDrawer";
import { useSearchParams } from "react-router-dom";
import FilterContextProvider from "../context/FilterContext";

const Layout = () => {
  const [params] = useSearchParams();

  if (window.location.hostname == "localhost") {
    localStorage?.setItem(
      "clientDetail",
      JSON.stringify({
        clientCode: "606950",
        sessionKey: "ca9fb798dad9e7e87b02b5fa3e4771566f72c77234df",
        // clientCode: "603424",
        // sessionKey: "00224759b3b64a65085721d3fe7a893842dd25be4327",
      })
    );
  } else {
    params.has("sessionKey") &&
      localStorage?.setItem(
        "clientDetail",
        JSON.stringify({
          clientCode: params?.get("clientCode"),
          sessionKey: params?.get("sessionKey"),
        })
      );
  }

  return (
    <div className="flex flex-row ">
      <FilterContextProvider>
        <AppDrawer />
      </FilterContextProvider>
    </div>
  );
};

export default Layout;
