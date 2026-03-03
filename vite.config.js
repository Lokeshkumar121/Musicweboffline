import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["app-icon.png"],
      manifest: {
        name: "My Music Player",
        short_name: "MusicApp",
        description: "Offline Music Player App",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/app-icon.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/app-icon.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      workbox: {
  globPatterns: ["**/*.{js,css,html,jpg,png,svg}"],

  maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, // 20 MB limit

  runtimeCaching: [
    {
      urlPattern: ({ request }) =>
        request.destination === "audio",
      handler: "CacheFirst",
      options: {
        cacheName: "audio-cache",
        expiration: {
          maxEntries: 50
        }
      }
    },
    {
      urlPattern: ({ request }) =>
        request.destination === "image",
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: {
          maxEntries: 50
        }
      }
    }
  ]
}
    })
  ]
});