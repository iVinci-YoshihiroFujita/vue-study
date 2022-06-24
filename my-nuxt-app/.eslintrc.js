module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/base",
        "plugin:vue/essential",
        "plugin:vue/strongly-recommended",
        "plugin:vue/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "ignorePatterns": [".eslintrc.*", "node_modules/**/*"],
    "rules": {
      // eslint rules
      "quotes": ["error", "double"],
      "no-duplicate-imports": "error",
      "no-template-curly-in-string": "error",
      "camelcase": "error",
      "semi": ["error", "never"],
      "prefer-const": "error",
      "no-var": "error",
      "no-trailing-spaces": ["error", {
        "ignoreComments": true
      }],
      "no-multiple-empty-lines": ["error", {
        "max": 1,
        "maxEOF": 1
      }],
      "max-len": ["error", {
        "ignoreComments": true
      }],
      "object-curly-spacing": ["error", "always"],
      "comma-dangle": ["error", "never"],
      "no-unused-vars": "off",

      // eslint-plugin-vue rules
      "vue/attribute-hyphenation": ["error", "never"]
    }
}
