import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [react()],
    base: "/",
    build: {
      // model-viewer is an intentionally lazy-loaded AR runtime; its gzip size is ~274 kB.
      chunkSizeWarningLimit: 1000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
});
