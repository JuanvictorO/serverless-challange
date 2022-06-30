export default {
  moduleFileExtensions: ['js', 'ts', 'json'],
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
  testEnvironment: 'node',
  coverageProvider: 'v8',
  clearMocks: true,
  bail: true,
  roots: ['<rootDir>'],
  moduleNameMapper: {
    '^@modules/(.*)': ['<rootDir>/src/modules/$1'],
    '^@config/(.*)': ['<rootDir>/src/config/$1'],
    '^@shared/(.*)': ['<rootDir>/src/shared/$1']
  },
};
