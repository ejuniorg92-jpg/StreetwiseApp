// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
// Vite config for Streetwise
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
});
