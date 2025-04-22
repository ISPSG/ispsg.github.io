import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Link as MuiLink,
  Divider,
  Button,
  Container,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MemberDetail = () => {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/data/members.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch member');
        }
        const data = await response.json();
        const memberItem = data.members.find(m => m.id === parseInt(memberId));
        if (!memberItem) {
          throw new Error('Member not found');
        }
        setMember(memberItem);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [memberId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading member details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        component={Link}
        to="/members"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Members
      </Button>

      <Box 
        sx={{ 
          p: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          backgroundColor: 'background.paper'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {member.name}
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>Member Information</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" color="text.secondary">Role</Typography>
              <Typography variant="body1">{member.role}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" color="text.secondary">School</Typography>
              <Typography variant="body1">{member.school}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" color="text.secondary">Research Area</Typography>
              <Typography variant="body1">{member.research}</Typography>
            </Grid>
            {member.website && (
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" color="text.secondary">Website</Typography>
                <MuiLink href={member.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </MuiLink>
              </Grid>
            )}
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Bio Section */}
        <Box>
          <Typography variant="h6" gutterBottom>Biography</Typography>
          <Typography variant="body1" paragraph>
            {member.bio}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default MemberDetail; 