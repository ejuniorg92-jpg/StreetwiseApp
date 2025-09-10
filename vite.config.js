// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/sw": {
        target: "http://127.0.0.1:5011",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sw/, "")
      }
    },
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173
    }
  }
});

