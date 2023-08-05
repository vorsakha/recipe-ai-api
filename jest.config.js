module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/*.test.ts"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "@auth/(.*)": "<rootDir>/src/auth/$1",
    "@constants/(.*)": "<rootDir>/src/constants/$1",
    "@docs/(.*)": "<rootDir>/src/docs/$1",
    "@models/(.*)": "<rootDir>/src/models/$1",
    "@controllers/(.*)": "<rootDir>/src/controllers/$1",
    "@database/(.*)": "<rootDir>/src/database/$1",
    "@middlewares/(.*)": "<rootDir>/src/middlewares/$1",
    "@routes/(.*)": "<rootDir>/src/routes/$1",
    "@services/(.*)": "<rootDir>/src/services/$1",
    "@validators/(.*)": "<rootDir>/src/validators/$1",
    "@schemas/(.*)": "<rootDir>/src/schemas/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
  },
};
