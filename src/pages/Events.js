import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LicenseInfo } from '@mui/x-license';
import SearchIcon from '@mui/icons-material/Search';

// Set the license key for MUI X v8
LicenseInfo.setLicenseKey(
  'YOUR_LICENSE_KEY'
);

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
    
    const eventDate = new Date(event.date);
    const matchesDate = (!startDate || !endDate) || 
      (eventDate >= startDate && eventDate <= endDate);
    
    const matchesPresenter = !presenterFilter || event.presenter === presenterFilter;

    return matchesSearch && matchesDate && matchesPresenter;
  });

  const handleRowClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            sx={{ minWidth: 200 }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            sx={{ minWidth: 200 }}
          />
        </LocalizationProvider>
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
                <TableRow 
                  key={event.id}
                  onClick={() => handleRowClick(event.id)}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.presenter}</TableCell>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>
                    <a href={event.paperLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
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