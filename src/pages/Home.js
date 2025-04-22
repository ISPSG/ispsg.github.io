import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        IS Paper Sharing Group
      </Typography>
      <Box 
        sx={{ 
          p: 3, 
          mb: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          backgroundColor: 'background.paper'
        }}
      >
        <Typography variant="h5" gutterBottom>
          About Us
        </Typography>
        <Typography paragraph>
          We are a group of researchers and enthusiasts who meet regularly to discuss and analyze recent papers in our field.
          Our goal is to foster a deeper understanding of cutting-edge research and promote collaborative learning.
        </Typography>
      </Box>
      <Box 
        sx={{ 
          p: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          backgroundColor: 'background.paper'
        }}
      >
        <Typography variant="h5" gutterBottom>
          What We Do
        </Typography>
        <Typography paragraph>
          • Weekly paper discussions
          • Collaborative analysis
          • Knowledge sharing
          • Research networking
        </Typography>
      </Box>
    </Container>
  );
};

export default Home; 