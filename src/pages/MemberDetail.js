import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  Link as MuiLink,
  Divider,
  Card,
  CardContent,
} from '@mui/material';

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
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {member.name}
        </Typography>
        
        <Grid container spacing={4}>
          {/* Main Member Details */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>Member Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">Role</Typography>
                  <Typography variant="body1">{member.role}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">School</Typography>
                  <Typography variant="body1">{member.school}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">Research Area</Typography>
                  <Typography variant="body1">{member.research}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">Website</Typography>
                  <MuiLink href={member.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </MuiLink>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Bio Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>Biography</Typography>
              <Typography variant="body1" paragraph>
                {member.bio}
              </Typography>
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Quick Links</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <MuiLink href={member.website} target="_blank" rel="noopener noreferrer">
                    Personal Website
                  </MuiLink>
                  <Link to="/members" style={{ textDecoration: 'none' }}>
                    <Typography color="primary">Back to Members</Typography>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default MemberDetail; 