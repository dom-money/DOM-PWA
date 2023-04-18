/* eslint-disable react/display-name */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import TransactionsQueueProvider from '../context/TransactionsQueueProvider';
import theme from '../styles/theme';
import GlobalStyle from '../styles/global';

export interface DialogWithMockedMethods extends HTMLDialogElement {
  showModal: ReturnType<typeof jest.fn>;
};

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

export const simulateTypingInStatelessInput = (
    stringToType: string,
    input: HTMLElement,
) => {
  let partialString = '';

  for (const character of stringToType) {
    partialString += character;
    fireEvent.change(input, {
      target: {
        value: partialString,
      },
    });
  };
};

export const renderWithTheme = (ui: React.ReactElement) => {
  const { rerender, ...result } = render(
      <ThemeProvider theme={ theme }>
        <GlobalStyle />
        { ui }
      </ThemeProvider>,
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
          <ThemeProvider theme={ theme }>
            <GlobalStyle />
            { rerenderUi }
          </ThemeProvider>,
      ),
  };
};

export const renderWithProviders = (ui: React.ReactNode) => {
  const wrapper = createWrapper();

  const { rerender, ...result } = render(wrapper({ children: ui }));
  return {
    ...result,
    rerender: (rerenderUi: React.ReactNode) =>
      rerender(wrapper({ children: rerenderUi })),
  };
};

export const createWrapper = () => {
  const testQueryClient = createTestQueryClient();

  return ({ children }: {children: React.ReactNode}) => (
    <ThemeProvider theme={ theme }>
      <GlobalStyle />
      <QueryClientProvider client={ testQueryClient }>
        <TransactionsQueueProvider>
          { children }
        </TransactionsQueueProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
