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

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch event data
        const eventResponse = await fetch(`${process.env.PUBLIC_URL}/data/events.json`);
        if (!eventResponse.ok) {
          throw new Error('Failed to fetch event');
        }
        const eventData = await eventResponse.json();
        const eventItem = eventData.events.find(e => e.id === parseInt(eventId));
        if (!eventItem) {
          throw new Error('Event not found');
        }
        setEvent(eventItem);

        // Fetch members data
        const membersResponse = await fetch(`${process.env.PUBLIC_URL}/data/members.json`);
        if (!membersResponse.ok) {
          throw new Error('Failed to fetch members');
        }
        const membersData = await membersResponse.json();
        setMembers(membersData.members);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading event details...</Typography>
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

  const getMemberById = (id) => {
    return members.find(member => member.id === id);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {event.title}
        </Typography>
        
        <Grid container spacing={4}>
          {/* Main Event Details */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>Event Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">Date</Typography>
                  <Typography variant="body1">{event.date}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">Time</Typography>
                  <Typography variant="body1">{event.time || 'To be announced'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">Venue</Typography>
                  <Typography variant="body1">{event.location}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">Link</Typography>
                  <MuiLink href={event.link} target="_blank" rel="noopener noreferrer">
                    Join Meeting
                  </MuiLink>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Presenter Information */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>Presenter</Typography>
              <Typography variant="h5" gutterBottom>{event.presenter}</Typography>
              <Typography variant="body1" paragraph>
                {event.presenterBio || 'Bio information coming soon...'}
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Abstract */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>Abstract</Typography>
              <Typography variant="body1" paragraph>
                {event.abstract || 'Abstract coming soon...'}
              </Typography>
            </Box>

            {/* Paper Link */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>Paper</Typography>
              <MuiLink href={event.paperLink} target="_blank" rel="noopener noreferrer">
                View Paper
              </MuiLink>
            </Box>
          </Grid>

          {/* Sidebar with Participants */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Participants</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {event.participants?.map((participantId) => {
                    const member = getMemberById(participantId);
                    return member ? (
                      <Chip
                        key={member.id}
                        label={member.name}
                        component={Link}
                        to={`/members/${member.id}`}
                        clickable
                        sx={{ textDecoration: 'none' }}
                      />
                    ) : null;
                  }) || (
                    <Typography variant="body2" color="text.secondary">
                      No participants listed yet
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EventDetail; 