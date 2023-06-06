import { createGlobalStyle } from 'styled-components';

import { ThemeType } from '../styles/theme';

const GlobalStyle = createGlobalStyle<{theme: ThemeType}>`
  html,
  body {
    padding: 0;
    margin: 0;
    background-color: ${(props) => props.theme.colors.backgroundMain};
    font-family: ${(props) => props.theme.fontFamily};
  }
  
  button, input {
    font-family: ${(props) => props.theme.fontFamily};
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
