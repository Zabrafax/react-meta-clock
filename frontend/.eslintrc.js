/* eslint-env node */
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },

    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },

    plugins: ["react", "jsx-a11y", "react-hooks"],

    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:react-hooks/recommended",
    ],

    rules: {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",

        "jsx-a11y/anchor-is-valid": "warn",

        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
    },

    settings: {
        react: {
            version: "detect",
        },
    },
};