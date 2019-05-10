// jest.config.js
const config = require('dotenv').config();

module.exports = {
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
    ],
    rootDir: "src",
    testRegex: ".spec.ts$",
    transform: {
    "^.+\\.(t|j)s$": "ts-jest"
    },
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    "reporters": [
        "default",
        "jest-junit"
    ],
    /*
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    }
    */
};
