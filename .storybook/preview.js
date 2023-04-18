import React from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { withTests } from '@storybook/addon-jest';
import results from '../reports/jest-test-results.json';
import { ThemeProvider } from 'styled-components';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';

import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/roboto-mono/400.css';

export const decorators = [
    Story => (
      <>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {Story()}
        </ThemeProvider>
      </>
    ),
    withTests({ results }),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'centered',
  backgrounds: {
    default: 'darkMain',
    values: [
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'darkMain',
        value: '#020202;',
      },
      {
        name: 'darkAdditional',
        value: '#1A1A1A;',
      },
    ],
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
    sort: 'requiredFirst',
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  a11y: {
    config: {
      rules: [
        {
          // You can also signify that a violation will need to be fixed in the future
          // by overriding the result of a rule to return "Needs Review"
          // rather than "Violation" if the rule fails:
          id: 'color-contrast',
          reviewOnFail: true,
        },
      ],
    },
  },
};
