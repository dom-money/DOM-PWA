import { createGlobalStyle } from 'styled-components';

import { ThemeType } from '../styles/theme';

const GlobalStyle = createGlobalStyle<{theme: ThemeType}>`
  html,
  body {
    padding: 0;
    margin: 0;
    background-color: ${(props) => props.theme.colors.backgroundMain};
    font-family: ${(props) => `
      ${props.theme.fontFamily},
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Helvetica,
      Arial,
      sans-serif
    `};
  }
  
  button, input {
    font-family: ${(props) => `
      ${props.theme.fontFamily},
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Helvetica,
      Arial,
      sans-serif
    `};
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
