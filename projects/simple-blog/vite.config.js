import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "/src"), // __dirname?
      "@assets": path.resolve(import.meta.dirname, "/src/assets"),
      "@css": path.resolve(import.meta.dirname, "/src/styles"),
      "@images": path.resolve(import.meta.dirname, "/src/assets/images"),
      "@js": path.resolve(import.meta.dirname, "/src/assets/js"),
    },
  },
});
