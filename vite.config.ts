import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["images/apple-touch-icon.png"],
        manifest: {
          name: "Kidrise 顯微鏡探秘",
          short_name: "Kidrise 顯微鏡",
          description: "顯微鏡使用教學、樣本觀察與學習任務",
          lang: "zh-HK",
          start_url: "/",
          scope: "/",
          display: "standalone",
          background_color: "#0f172a",
          theme_color: "#0f172a",
          icons: [
            { src: "/images/pwa-192.png", sizes: "192x192", type: "image/png" },
            { src: "/images/pwa-512.png", sizes: "512x512", type: "image/png" },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
          navigateFallback: "index.html",
          globPatterns: ["**/*.{js,css,html,svg,webp,woff2}"],
          runtimeCaching: [
            {
              urlPattern: ({ request }) => request.destination === "image",
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "kidrise-microscope-images",
                expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 },
              },
            },
          ],
        },
      }),
    ],
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
