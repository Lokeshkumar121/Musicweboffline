import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"],
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
            src: "/images/img1.jpg",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/images/img1.jpg",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,mp3,jpg,png}"]
      }
    })
  ]
});