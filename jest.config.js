module.exports = {
  // Load setup-tests.js before test execution
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>setup-tests.js'],
  // ...
};
