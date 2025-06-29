import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/app/",
  resolve: {
    alias: {
      "@": path.resolve(new URL(".", import.meta.url).pathname, "./src"),
    },
  },
  server: {
    // 1. Expose server to all network interfaces
    host: "0.0.0.0",
    proxy: {
      // Proxy all LangGraph API endpoints to the backend server
      "/threads": {
        target: "http://127.0.0.1:2024",
        changeOrigin: true,
        secure: false,
      },
      "/assistants": {
        target: "http://127.0.0.1:2024",
        changeOrigin: true,
        secure: false,
      },
      "/runs": {
        target: "http://127.0.0.1:2024",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://127.0.0.1:2024",
        changeOrigin: true,
        secure: false,
      },
      // Catch-all for any other backend routes
      "/ok": {
        target: "http://127.0.0.1:2024",
        changeOrigin: true,
        secure: false,
      },
    },
    // 3. Allow requests from any Replit preview URL
    allowedHosts: [".replit.dev"],
  },
});