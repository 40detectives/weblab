import { defineConfig } from "vite";
import path from "node:path";
import { getHtmlEntryFiles } from "@weblab/shared/utils";

export default defineConfig({
  base: "/weblab/labs/conquering-responsive-layouts/dist/",
  build: {
    outDir: "dist",
    rolldownOptions: {
      input: {
        ...getHtmlEntryFiles("challenges"),
        main: path.resolve(import.meta.dirname, "index.html"),
      },
    },
  },
});
