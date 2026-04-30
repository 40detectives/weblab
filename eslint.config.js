/* monorepo root */
import js from "@eslint/js";
import json from "@eslint/json";
import eslintConfigPrettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import refreshReact from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import { createNodeResolver, importX } from "eslint-plugin-import-x";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  {
    name: "eslint js recommended",
    files: ["**/*.{js,jsx,mjs,cjs}"],
    plugins: { js },
    extends: [js.configs.recommended, importX.flatConfigs.recommended],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[_]" }],
    },
  },
  {
    name: "eslint json recommended",
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
    ignores: ["./package-lock.json"],
  },
  {
    name: "eslint json with comments recommended",
    files: ["**/*.jsonc"],
    plugins: { json },
    language: "json/jsonc",
    extends: ["json/recommended"],
  },
  globalIgnores(["dist"]),
  {
    name: "react related",
    files: ["**/*.{js,jsx}"],
    extends: [
      refreshReact.configs.vite,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat["jsx-runtime"],
      reactHooks.configs.flat["recommended-latest"],
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import-x/resolver-next": [
        createNodeResolver({ extensions: [".js", ".jsx", ".mjs", ".cjs"] }),
      ],
    },
    rules: {
      "react/prop-types": ["off"],
    },
  },
  {
    name: "eslint disable rules to match prettier",
    files: ["**/*.{js,mjs,cjs,jsx}"],
    extends: [eslintConfigPrettier],
  },
]);
