const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js ...
  // .. and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: [ '<rootDir>/jest.setup.js' ],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured ...
    // .. for you soon)
    '^@/components/(.*)$': '<rootDir>/components/$1',

    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [ '<rootDir>/__tests__/utils.tsx' ],
  modulePathIgnorePatterns: [ 'node_modules', 'jest-test-results.json' ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/.storybook/**',
    '!**/stories/**',
    '!**/__tests__/**',
    '!**/mocks/**',
    '!**/pages/api/**',
  ],
  coverageReporters: [ 'clover', 'json', 'lcov', 'text', 'cobertura' ],
  reporters: [
    'default',
    [ 'jest-junit', { outputDirectory: 'reports', outputName: 'junit.xml' } ],
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load ...
// .. the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
