import '@testing-library/jest-dom/extend-expect';
import { server } from './mocks/server';
import { loadEnvConfig } from '@next/env';
import 'jest-styled-components';

// Loading environment variables the same way Next.js does
export default async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });

  // Workaround to fix absence of support for the HTMLDialogElement in jsdom ...
  // .. see: https://github.com/jsdom/jsdom/issues/3294
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();

  // Mocking IntersectionObserver since it isn't available in jsdom
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
