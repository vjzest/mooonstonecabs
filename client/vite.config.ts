import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },
  server: {
    proxy: {
      // ⭐ Proxy /api calls to backend to avoid CORS during local dev
      "/api": {
        // During local development proxy API requests to the local backend
        // Change to Render only when testing the deployed backend.
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path, // keep /api prefix
      },
    },
  },
});
