import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Skeleton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/data/members.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        const sortedMembers = [...data.members].sort((a, b) => 
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
        setMembers(sortedMembers);
        setFilteredMembers(sortedMembers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      let filtered = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.research.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Sort the filtered results
      filtered.sort((a, b) => {
        const aValue = a[sortBy].toLowerCase();
        const bValue = b[sortBy].toLowerCase();
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });

      setFilteredMembers(filtered);
    }
  }, [searchTerm, members, sortBy, sortOrder, loading]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setSortBy('name');
    setSortOrder('asc');
  };

  const renderLoadingSkeleton = () => {
    if (viewMode === 'grid') {
      return (
        <Grid container spacing={3} justifyContent="center">
          {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Skeleton variant="text" width="60%" height={40} />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="rectangular" width="100%" height={32} sx={{ mt: 2 }} />
                </CardContent>
                <CardActions>
                  <Skeleton variant="rectangular" width={100} height={36} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>School</TableCell>
                <TableCell>Research Area</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell align="right"><Skeleton variant="rectangular" width={100} height={36} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  };

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Our Members
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search members..."
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
        <Button
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={handleReset}
          sx={{ minWidth: 120 }}
        >
          Reset
        </Button>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newMode) => setViewMode(newMode)}
          aria-label="view mode"
        >
          <ToggleButton value="grid" aria-label="grid view">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        renderLoadingSkeleton()
      ) : viewMode === 'grid' ? (
        <Grid container spacing={3} justifyContent="center">
          {filteredMembers.map((member) => (
            <Grid item xs={12} sm={6} md={3} key={member.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper'
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {member.school}
                  </Typography>
                  <Chip
                    label={member.research}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/members/${member.id}`}
                    size="small"
                    color="primary"
                  >
                    View Details
                  </Button>
                  {member.website && (
                    <Button
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                    >
                      Visit Website
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'name'}
                    direction={sortBy === 'name' ? sortOrder : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'role'}
                    direction={sortBy === 'role' ? sortOrder : 'asc'}
                    onClick={() => handleSort('role')}
                  >
                    Role
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'school'}
                    direction={sortBy === 'school' ? sortOrder : 'asc'}
                    onClick={() => handleSort('school')}
                  >
                    School
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'research'}
                    direction={sortBy === 'research' ? sortOrder : 'asc'}
                    onClick={() => handleSort('research')}
                  >
                    Research Area
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.school}</TableCell>
                  <TableCell>{member.research}</TableCell>
                  <TableCell align="right">
                    <Button
                      component={Link}
                      to={`/members/${member.id}`}
                      size="small"
                      color="primary"
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Members; 