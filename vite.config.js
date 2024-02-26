import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/erply-sales-by-hour-report/",
  // base: "report/sales-by-hour",
  server: { host: true },
});
