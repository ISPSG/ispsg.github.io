import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Paper } from '@mui/material';
import Home from './pages/Home';
import Events from './pages/Events';
import Members from './pages/Members';

function App() {
  return (
    <Router>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh' 
      }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ISPSG
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
              <Link to="/events" style={{ color: 'white', textDecoration: 'none' }}>Events</Link>
              <Link to="/members" style={{ color: 'white', textDecoration: 'none' }}>Members</Link>
            </Box>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4, flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/members" element={<Members />} />
          </Routes>
        </Container>
        <Paper 
          component="footer" 
          sx={{ 
            py: 2, 
            mt: 'auto', 
            backgroundColor: (theme) => theme.palette.grey[200]
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              © 2025 ISPSG. All rights reserved.
            </Typography>
          </Container>
        </Paper>
      </Box>
    </Router>
  );
}

export default App;
