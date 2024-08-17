/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    '^.+\\.vue$': 'vue-jest',
    "^.+.tsx?$": ["ts-jest",{}],
  },
};