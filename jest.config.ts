import type { Config } from "jest"

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/src/test/__mocks__/fileMock.js',
    '\\.(css)$': '<rootDir>/src/test/__mocks__/styleMock.js',
    '\\.json$': '<rootDir>/src/test/__mocks__/jsonMock.js'
  }
}

export default config;