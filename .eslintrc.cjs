module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: 0,
    "comma-dangle": 0,
    semi: 0,
    "react/react-in-jsx-scope": 0,
    "space-before-function-paren": 0,
    "multiline-ternary": 0,
    indent: 0,
  },
};
