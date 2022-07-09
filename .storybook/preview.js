import React from 'react';

import { GlobalStyle } from '../pages/_app';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

export const decorators = [
    Story => (
      <>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Story />
        </ThemeProvider>
      </>
    )
  ];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}