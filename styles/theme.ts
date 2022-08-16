const theme = {
  fontFamily: `
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Helvetica,
    Arial,
    sans-serif`,
  fontFamilyMono: `
    Roboto Mono,
    Robotization Mono,
    Noto Sans Mono,
    IBM Plex Mono,
    Kawkab Mono,
    DejaVu Sans Mono,
    Cousine,
    ST1X Two Math For Robot0 Mono,
    Symbola For Robot0 Mono,
    Source Han Sans,
    monospace`,
  colors: {
    primary: '#FEF200',
    success: '#A1FB56',
    danger: '#E30000',
    backgroundMain: '#020202',
  },
};

export default theme;

export type ThemeType = typeof theme;
