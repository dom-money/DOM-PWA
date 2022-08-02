const theme = {
  fontFamily:
    `Inter
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Helvetica,
    Arial,
    sans-serif`,
  fontFamilyMono: 'Roboto Mono',
  colors: {
    primary: '#FEF200',
    success: '#A1FB56',
    danger: '#E30000',
    backgroundMain: '#020202',
  },
};

export default theme;

export type ThemeType = typeof theme;
