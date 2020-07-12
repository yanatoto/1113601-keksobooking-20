module.exports = {
  "extends": "eslint:recommended",
  "rules": {
    // enable additional rules
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": 0,
    "semi": ["error", "always"],

    // override default options for rules from base configurations
    "comma-dangle": [0, "always"],
    "no-cond-assign": ["error", "always"],

    // disable rules from base configurations
    "no-console": "off",
  },
  "env": {
    "browser": true,
  }
};
