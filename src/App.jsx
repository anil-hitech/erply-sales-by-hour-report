import "./App.css";
import { router } from "./routes/router";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
