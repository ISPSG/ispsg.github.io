import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Paper, ThemeProvider, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Home from './pages/Home';
import Events from './pages/Events';
import Members from './pages/Members';
import EventDetail from './pages/EventDetail';
import MemberDetail from './pages/MemberDetail';
import NotFound from './pages/NotFound';
import { ThemeProvider as CustomThemeProvider, useTheme } from './theme/ThemeContext';
import { getTheme } from './theme/theme';

function AppContent() {
  const { mode, toggleTheme } = useTheme();
  const theme = getTheme(mode);

  const lastUpdateDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary'
        }}>
          <AppBar 
            position="static" 
            color="primary"
            elevation={0}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              color: 'text.primary',
            }}
          >
            <Toolbar>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  flexGrow: 1,
                  fontWeight: 600,
                  color: 'primary.main',
                }}
              >
                ISPSG
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Link 
                  to="/" 
                  style={{ 
                    color: 'inherit',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-1px)',
                    }
                  }}
                >
                  Home
                </Link>
                <Link 
                  to="/events" 
                  style={{ 
                    color: 'inherit',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-1px)',
                    }
                  }}
                >
                  Events
                </Link>
                <Link 
                  to="/members" 
                  style={{ 
                    color: 'inherit',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-1px)',
                    }
                  }}
                >
                  Members
                </Link>
                <IconButton onClick={toggleTheme} color="inherit">
                  {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg" sx={{ mt: 4, flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:eventId" element={<EventDetail />} />
              <Route path="/members" element={<Members />} />
              <Route path="/members/:memberId" element={<MemberDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
          <Paper 
            component="footer" 
            sx={{ 
              py: 2, 
              mt: 'auto', 
              backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
            }}
          >
            <Container maxWidth="lg">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  © 2025 ISPSG. All rights reserved.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last updated: {lastUpdateDate}
                </Typography>
              </Box>
            </Container>
          </Paper>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}

export default App;
