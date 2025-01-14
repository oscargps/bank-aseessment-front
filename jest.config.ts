export default {
  maxWorkers: 2,
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverageFrom: [
    "<rootDir>/src/app/pages/**/*.{ts,tsx}",
    '<rootDir>/src/app/components/**/*.{ts,tsx}'],
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};