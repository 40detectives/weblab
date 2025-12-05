import { defineConfig } from "vite";
import path from "node:path";
import fs from "node:fs";

export default defineConfig({
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

function getHtmlEntryFiles(srcDir) {
  const entry = {};

  function traverseDir(currentDir) {
    const files = fs.readdirSync(currentDir);

    files.forEach((file) => {
      const filePath = path.join(currentDir, file);
      const isDirectory = fs.statSync(filePath).isDirectory();

      if (isDirectory) {
        // If it's a directory, recursively traverse it
        traverseDir(filePath);
      } else if (path.extname(file) === ".html") {
        // If it's an HTML file, add it to the entry object
        const name = path.relative(srcDir, filePath).replace(/\..*$/, "");
        entry[name] = filePath;
      }
    });
  }

  traverseDir(srcDir);

  console.log(entry);
  return entry;
}
