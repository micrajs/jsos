const { join } = require('path');

const config = (...path) => join(__dirname, '../', ...(path || []));
const root = (...path) => join(__dirname, '../../', ...(path || []));

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: root('tsconfig.json'),
    },
  },
  coverageDirectory: config('test/coverage'),
  coverageReporters: ['json', 'html', 'text', 'text-summary'],
  collectCoverageFrom: ['./**/*.{js,ts,tsx}', './**/*.test.{js,ts,tsx}'],
  rootDir: root('src'),
  testRegex: '.*(/tests/|/.*/tests/).*\\.test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: [config('test/setup.ts')],
};
