import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const [presenterFilter, setPresenterFilter] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/data/events.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.events);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Get unique values for filters
  const dates = [...new Set(events.map(event => event.date))];
  const presenters = [...new Set(events.map(event => event.presenter))];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = Object.values(event).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesDate = !dateFilter || event.date === dateFilter;
    const matchesPresenter = !presenterFilter || event.presenter === presenterFilter;

    return matchesSearch && matchesDate && matchesPresenter;
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading events...</Typography>
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
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Events
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1, minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Date</InputLabel>
          <Select
            value={dateFilter}
            label="Date"
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <MenuItem value="">All Dates</MenuItem>
            {dates.map((date) => (
              <MenuItem key={date} value={date}>{date}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Presenter</InputLabel>
          <Select
            value={presenterFilter}
            label="Presenter"
            onChange={(e) => setPresenterFilter(e.target.value)}
          >
            <MenuItem value="">All Presenters</MenuItem>
            {presenters.map((presenter) => (
              <MenuItem key={presenter} value={presenter}>{presenter}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {filteredEvents.length === 0 ? (
        <Typography sx={{ textAlign: 'center', mt: 4 }}>
          No events found matching the selected criteria.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Presenter</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Paper</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.presenter}</TableCell>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>
                    <a href={event.paperLink} target="_blank" rel="noopener noreferrer">
                      View Paper
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Events; 