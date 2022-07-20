import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';

const theme = {
  fontFamily: 'Inter',
  colors: {
    primary: '#FEF200',
    success: '#A1FB56',
    backgroundMain: '#020202',
  },
};

export default theme;

export type ThemeType = typeof theme;
