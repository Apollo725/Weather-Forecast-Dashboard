const config = {
  "extends": ['airbnb', 'prettier', 'prettier/react'],
  "plugins": ["prettier", "react", "import"],
  "parser": "babel-eslint",
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "printWidth": 100,
        "tabWidth": 2,
        "useTabs": false,
        "semi": true,
        "singleQuote": true,
        "trailingComma": "all"
      }
    ],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "react/jsx-filename-extension": "off",
    "react/jsx-wrap-multilines": "off",
    "react/forbid-prop-types": ["warn", { "forbid": ["any"] }],
    "react/require-default-props": "off",
    "arrow-parens": ["error", "as-needed"],
    "class-methods-use-this": "off",
    "no-return-assign": ["error", "except-parens"],
    "object-curly-newline": "off",
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "no-debugger": "off",
    "react/no-multi-comp": "off",
    "import/prefer-default-export": "off",
    "function-paren-newline": "off",
    "no-unused-expressions": "off",
    // written by Apollo725
    "react/prefer-stateless-function": "off",
    "react/no-string-refs": "off",
    "no-console": "off",
    "no-undef": "off",
    "react/prop-types": "off",
    "react/destructuring-assignment": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "react/no-access-state-in-setstate": "off",
    "no-shadow": "off",
    "react/no-array-index-key": "off",
    "jsx-a11y/label-has-for": "off",
    "prefer-template": "off",
    "import/no-named-as-default": "off",
    "react/button-has-type": "off",
    "prefer-destructuring": "off",
    "import/no-duplicates": "off",
    "react/no-unused-state": "off"
  },
  "globals": {
    "document": 1,
    "window": 1
  }
}
module.exports = config; 
