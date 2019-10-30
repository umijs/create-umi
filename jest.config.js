module.exports = {
  setupFilesAfterEnv: [
    './test/jest.setup.js'
  ],
  modulePathIgnorePatterns: [
    "<rootDir>/.*/templates",
  ],
  testPathIgnorePatterns: [
    "/lib/"
  ],
  collectCoverageFrom: [
    '!lib/**/templates/**',
    'lib/**/*.{js.ts}',
  ],
}
