import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@css": path.resolve(import.meta.dirname, "/styles"),
      "@images": path.resolve(import.meta.dirname, "/images"),
    },
  },
  base: "/weblab/projects/simple-blog/dist/",
  build: {
    outDir: "dist",
    rolldownOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "index.html"),
        pages: path.resolve(import.meta.dirname, "pages/about.html"),
      },
    },
  },
});
