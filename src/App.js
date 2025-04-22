import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import Home from './pages/Home';
import Events from './pages/Events';
import Members from './pages/Members';

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Paper Reading Group
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
              <Link to="/events" style={{ color: 'white', textDecoration: 'none' }}>Events</Link>
              <Link to="/members" style={{ color: 'white', textDecoration: 'none' }}>Members</Link>
            </Box>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/members" element={<Members />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
