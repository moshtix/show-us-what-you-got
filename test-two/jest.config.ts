import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  transform: {
    '^.+\\.(j|t)sx?$': 'ts-jest',
  },
  automock: false,
  testRegex: "src/.*(-|\\.)test\\.(j|t)s$",
  collectCoverageFrom: [
    "src/*.{js}",
    "!**/*-test.js",
    "!**/*.test.js"
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
export default config;