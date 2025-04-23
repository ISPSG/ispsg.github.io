import { createTheme } from '@mui/material/styles';
import baseTheme from './baseTheme';

export const getTheme = (mode) => {
  const theme = createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      mode,
      primary: {
        main: '#24A388',
        light: '#4AB6A0',
        dark: '#1A7A66',
      },
      secondary: {
        main: '#1976d2',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff',
        secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
      },
    },
    components: {
      ...baseTheme.components,
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
            color: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: mode === 'light' ? 8 : 4,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'light' ? '0 2px 8px rgba(0,0,0,0.05)' : '0 2px 8px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'light' ? '0 4px 12px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.3)',
            },
          },
        },
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

  return theme;
}; 