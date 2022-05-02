module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*Controller.ts',
    '!<rootDir>/src/shared/**/*.ts',
    '!<rootDir>/src/types/*.ts',
    '!<rootDir>/src/**/errors/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  testEnvironment: 'node',
  transform: {
    '\\.ts$': 'ts-jest'
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}
