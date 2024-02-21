import AppDrawer from "../components/AppDrawer";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Layout = () => {
  const [params] = useSearchParams();

  const {
    client: { setClientCode },
  } = useAppContext();

  params.has("clientCode") && setClientCode(params?.get("clientCode"));

  return (
    <div className="flex flex-row ">
      <AppDrawer />
    </div>
  );
};

export default Layout;
