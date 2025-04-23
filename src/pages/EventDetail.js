import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  Button,
  Container,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate('/events')}
          startIcon={<ArrowBackIcon />}
        >
          Return to Events
        </Button>
      </Box>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : event ? (
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {event.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {event.date} | {event.time} | {event.location}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
            {(event.tags || []).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Presenter: {event.presenter}
          </Typography>
          <Typography variant="body1" paragraph>
            {event.presenterBio}
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Abstract
          </Typography>
          <Typography variant="body1" paragraph>
            {event.abstract}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              href={event.paperLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mr: 2 }}
            >
              View Paper
            </Button>
            <Button
              variant="outlined"
              color="primary"
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Meeting Notes
            </Button>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Participants
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {event.participants.map((participantId) => {
              const participant = getMemberById(participantId);
              return participant ? (
                <Box key={participantId} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography 
                    component={Link} 
                    to={`/members/${participantId}`}
                    sx={{ 
                      textDecoration: 'none',
                      color: 'primary.main',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {participant.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ({participant.role}, {participant.school})
                  </Typography>
                </Box>
              ) : null;
            })}
          </Box>
        </Box>
      ) : (
        <Typography>Event not found</Typography>
      )}
    </Container>
  );
};

export default EventDetail; 