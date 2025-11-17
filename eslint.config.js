import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import react from "eslint-plugin-react"; // Add this
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        plugins: {
            "@stylistic": stylistic,
            react: react,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        rules: {
            "@stylistic/padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: "expression", next: "expression" },
                { blankLine: "always", prev: "expression", next: "if" },
                { blankLine: "always", prev: "expression", next: "return" },
                { blankLine: "always", prev: "const", next: "if" },
                { blankLine: "always", prev: "if", next: "if" },
                { blankLine: "always", prev: "if", next: "return" },
                { blankLine: "always", prev: "const", next: "return" },
                { blankLine: "always", prev: "import", next: "export" },
                { blankLine: "always", prev: "import", next: "type" },
                { blankLine: "always", prev: "import", next: "function" },
                { blankLine: "always", prev: "import", next: "class" },
                { blankLine: "always", prev: "import", next: "const" },
                { blankLine: "always", prev: "import", next: "let" },
                { blankLine: "always", prev: "type", next: "function" },
                { blankLine: "always", prev: "export", next: "export" },
                { blankLine: "always", prev: "*", next: "export" },
                { blankLine: "always", prev: "*", next: "multiline-const" },
                { blankLine: "always", prev: "multiline-const", next: "*" },
                { blankLine: "always", prev: "directive", next: "*" },
            ],
            "@stylistic/jsx-newline": "error",
            "react/self-closing-comp": "error",
        },
    },
]);
