module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
    
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "max-len": [2, { "code": 100, "ignoreStrings": true }],
        "semi": ["error", "always"],
        "eqeqeq": [2, "always"],
        "indent": [2, 2, { "SwitchCase": 1 }],
        "no-console": 2,
        "eol-last": 2,
        "jsx-quotes": 2,
    }
};