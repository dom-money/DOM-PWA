/* eslint-disable react/display-name */
import { render } from '@testing-library/react';
import { rest } from 'msw';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import GlobalStyle from '../styles/global';

export const handlers = [
  rest.get(
      '*/react-query',
      (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
              name: 'mocked-react-query',
            }),
        );
      },
  ),
];

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => {},
  },
});

export const renderWithTheme = (ui: React.ReactElement) => {
  const { rerender, ...result } = render(
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        { ui }
      </ThemeProvider>,
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            { rerenderUi }
          </ThemeProvider>,
      ),
  };
};

export const renderWithProviders = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <QueryClientProvider client={testQueryClient}>
          { ui }
        </QueryClientProvider>
      </ThemeProvider>,
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <QueryClientProvider client={testQueryClient}>
              { rerenderUi }
            </QueryClientProvider>
          </ThemeProvider>,
      ),
  };
};

export const createWrapper = () => {
  const testQueryClient = createTestQueryClient();
  return ({ children }: {children: React.ReactNode}) => (
    <QueryClientProvider client={testQueryClient}>
      { children }
    </QueryClientProvider>
  );
};
