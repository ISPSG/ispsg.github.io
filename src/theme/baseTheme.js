import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  palette: {
    primary: {
      main: '#24A388',
      light: '#4CB6A2',
      dark: '#1A7A66',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2C3E50',
      light: '#3D5568',
      dark: '#1A2530',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#6C757D',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#2C3E50',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#2C3E50',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#2C3E50',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#2C3E50',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#2C3E50',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#2C3E50',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#2C3E50',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#6C757D',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default baseTheme; 