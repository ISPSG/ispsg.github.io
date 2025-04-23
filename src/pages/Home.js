import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Link, Divider, Paper, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import MemberMap from '../components/MemberMap';

const Home = () => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/ispsg/ispsg.github.io/main/views.json');
        const data = await response.json();
        setViews(data.views);
      } catch (error) {
        console.error('Error fetching views:', error);
      }
    };

    fetchViews();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Information Systems Paper Sharing Group
        </Typography>
        <img 
          src="https://views-counter.vercel.app/badge?pageId=https%3A%2F%2Fispsg.github.io&rightColor=0adb3f" 
          alt="Views Counter"
          style={{ height: '24px' }}
        />
      </Box>
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
          Inspired by the spirit of open academic discussion, our Group aims to foster an environment where scholars can exchange ideas and critically engage with academic papers in the field of Information Systems.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Our Mission
        </Typography>
        <Typography paragraph sx={{ fontStyle: 'italic' }}>
          "One more critique makes the paper better."
        </Typography>
        <Typography paragraph>
          We aim to bring together scholars who are interested in the study of Information Systems.
        </Typography>
        <Typography paragraph>
          For suggestions or inquiries, please contact Bruce at{' '}
          <Link href="mailto:siyuan.jin@connect.ust.hk" color="primary">
            siyuan.jin@connect.ust.hk
          </Link>
          .
        </Typography>
      </Box>
      
  
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
          Our Global Community
        </Typography>
        <Typography paragraph sx={{ mb: 2 }}>
          Our members come from prestigious institutions around the world, contributing to a diverse and vibrant research community.
        </Typography>
        <MemberMap />
      </Box>

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
          Acknowledgments
        </Typography>
        <Typography paragraph>
          Our activity provides no financial incentive. Thus, we are grateful for any Professor who is willing to join us:
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Prof. Xin Li
            </Typography>
            <Typography variant="body2" color="text.secondary">
              City University of Hong Kong
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Prof. Hongchang Wang
            </Typography>
            <Typography variant="body2" color="text.secondary">
              University of Texas at Dallas
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Prof. Xinyu Fu
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Georgia State University
            </Typography>
          </Box>
        </Box>
      </Box>



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
          Organizers
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  2025
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body1">
                    <Box component="span" fontWeight="bold">Xuewen Han</Box> (THU)
                  </Typography>
                  <Typography variant="body1">
                    <Box component="span" fontWeight="bold">Jingyuan Deng</Box> (NUS)
                  </Typography>
                  <Typography variant="body1">
                    <Box component="span" fontWeight="bold">Yihan Deng</Box> (CityU)
                  </Typography>
                  <Typography variant="body1">
                    <Box component="span" fontWeight="bold">Weibo Li</Box> (ASU)
                  </Typography>
                  <Typography variant="body1">
                    <Box component="span" fontWeight="bold">Siyuan (Bruce) Jin</Box> (HKUST)
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  2024
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body1">
                    <Box component="span" fontWeight="bold">Siyuan (Bruce) Jin</Box> (HKUST)
                  </Typography>
                  <Typography variant="body1">
                    <Box component="span" fontWeight="bold">Zhe Wang</Box> (PolyU)
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Website Contributors: Austin Cheung, Bruce Jin, Charles Tian, Lionel Wang, Xinyuan Wei
        </Typography>
      </Box>
    </Container>
  );
};

export default Home; 