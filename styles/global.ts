import { createGlobalStyle } from 'styled-components';

import { MyTheme } from '../styles/theme';

const GlobalStyle = createGlobalStyle<{theme: MyTheme}>`
  body {
    font-family: ${(props) => props.theme.fontFamily};
  }
  button {
    font-family: ${(props) => props.theme.fontFamily};
  }
`;

export default GlobalStyle;
