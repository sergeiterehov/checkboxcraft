import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: {
      src: path.resolve("src/"),
    },
  },
  server: {
    host: true,
    proxy: {
      "/api": "http://localhost:3000/api",
    },
  },
  preview: {
    port: 8080,
  },
});
