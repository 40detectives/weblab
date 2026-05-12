import { defineConfig } from "vite";
import path from "node:path";
import { getHtmlEntryFiles } from "@weblab/shared/utils";

export default defineConfig({
  // base: "/weblab/labs/flexbox-simplified/dist/",
  build: {
    outDir: "dist",
    rolldownOptions: {
      input: {
        ...getHtmlEntryFiles("lessons"),
        main: path.resolve(import.meta.dirname, "index.html"),
      },
    },
  },
});
