module.exports = {
  setupFilesAfterEnv: './test/jest.setup.js',
  modulePathIgnorePatterns: [
    "<rootDir>/lib",
  ],
  testPathIgnorePatterns: [
    "/lib/"
  ],
  collectCoverageFrom: [
    'lib/**/*.{js.ts}',
    '!lib/**/templates/**'
  ],
}
