module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  testTimeout: 12000,
  collectCoverageFrom: ["**/src/**/*.ts"],
};
