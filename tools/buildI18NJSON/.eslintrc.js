const path = require('path');
module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        // "eslint:recommended",
    ],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "overrides": [
        {
            "files": ["./src/database_part.js"],
            "rules": {
                "multipObjVal/noa": "error"
            }
        }
    ],
    "rules": {
        // "multipObjVal/noa": "error",
    },
    "plugins":["multipObjVal"]
};