import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const Home = () => {
  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Our Paper Sharing Group 
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          About Us
        </Typography>
        <Typography paragraph>
          We are a group of researchers and enthusiasts who meet regularly to discuss and analyze recent papers in our field.
          Our goal is to foster a deeper understanding of cutting-edge research and promote collaborative learning.
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          What We Do
        </Typography>
        <Typography paragraph>
          • Weekly paper discussions
          • Collaborative analysis
          • Knowledge sharing
          • Research networking
        </Typography>
      </Paper>
    </Box>
  );
};

export default Home; 