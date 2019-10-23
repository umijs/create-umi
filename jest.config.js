module.exports = {
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
