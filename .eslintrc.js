module.exports = {
    "parser": "babel-eslint",
    "env": {
    "browser": true
    },
    "plugins": [
        "react",
        "react-native",
        "jsx-a11y",
        "import",
            "json"
    ],
        "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "ecmaFeatures": {
        "jsx": true
    },
    "rules": {
        "react-native/no-unused-styles": 2,
        "react-native/split-platform-components": 2,
        "react-native/no-inline-styles": 2,
        "react-native/no-color-literals": 2,
        "no-undef": 0,
        "no-console": 0
    }
};