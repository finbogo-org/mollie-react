// Jest types for global usage
import '@types/jest';

declare global {
  const jest: jest.Jest;
  const describe: jest.Describe;
  const it: jest.It;
  const test: jest.It;
  const expect: jest.Expect;
  const beforeEach: jest.Lifecycle;
  const afterEach: jest.Lifecycle;
  const beforeAll: jest.Lifecycle;
  const afterAll: jest.Lifecycle;
}
