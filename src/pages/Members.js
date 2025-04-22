import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const MemberCard = ({ member }) => (
  <Card sx={{ 
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '200px',
    width: '100%'
  }}>
    <CardContent sx={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      '&:last-child': { pb: 2 }
    }}>
      <Typography 
        variant="h6" 
        component="div" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical'
        }}
      >
        {member.name}
      </Typography>
      <Typography 
        color="text.secondary" 
        gutterBottom
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical'
        }}
      >
        {member.role}
      </Typography>
      <Typography 
        color="text.secondary" 
        gutterBottom
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical'
        }}
      >
        {member.school}
      </Typography>
      <Typography 
        variant="body2" 
        paragraph
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}
      >
        Research: {member.research}
      </Typography>
      <Link 
        href={member.website} 
        target="_blank" 
        rel="noopener noreferrer"
        sx={{ 
          mt: 'auto',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline'
          }
        }}
      >
        Personal Website
      </Link>
    </CardContent>
  </Card>
);

const Members = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleFilter, setRoleFilter] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [researchFilter, setResearchFilter] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/data/members.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        setMembers(data.members);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Get unique values for filters
  const roles = [...new Set(members.map(member => member.role))];
  const schools = [...new Set(members.map(member => member.school))];
  const researchAreas = [...new Set(members.map(member => member.research))];

  const filteredMembers = members.filter((member) => {
    const matchesSearch = Object.values(member).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesRole = !roleFilter || member.role === roleFilter;
    const matchesSchool = !schoolFilter || member.school === schoolFilter;
    const matchesResearch = !researchFilter || member.research === researchFilter;

    return matchesSearch && matchesRole && matchesSchool && matchesResearch;
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading members...</Typography>
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
        Group Members
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
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
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={roleFilter}
            label="Role"
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <MenuItem value="">All Roles</MenuItem>
            {roles.map((role) => (
              <MenuItem key={role} value={role}>{role}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>School</InputLabel>
          <Select
            value={schoolFilter}
            label="School"
            onChange={(e) => setSchoolFilter(e.target.value)}
          >
            <MenuItem value="">All Schools</MenuItem>
            {schools.map((school) => (
              <MenuItem key={school} value={school}>{school}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Research Area</InputLabel>
          <Select
            value={researchFilter}
            label="Research Area"
            onChange={(e) => setResearchFilter(e.target.value)}
          >
            <MenuItem value="">All Research Areas</MenuItem>
            {researchAreas.map((area) => (
              <MenuItem key={area} value={area}>{area}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {filteredMembers.length === 0 ? (
        <Typography sx={{ textAlign: 'center', mt: 4 }}>
          No members found matching the selected criteria.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredMembers.map((member) => (
            <Grid item xs={12} sm={6} md={3} key={member.id} sx={{ display: 'flex' }}>
              <MemberCard member={member} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Members; 