module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint"
    ],
    "extends": ["airbnb-base", "airbnb-typescript/base"],
    "overrides": [
        {
            "files": [
                "*.ts",
                "*.tsx",
            ]
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "rules": {
    }
}
