import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const MemberMap = () => {
  const [schools, setSchools] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if Google Maps API key is available
        if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
          throw new Error('Google Maps API key is not configured. Please check your .env file.');
        }

        // Fetch schools data
        const schoolsResponse = await fetch(`${process.env.PUBLIC_URL}/data/schools.json`);
        const schoolsData = await schoolsResponse.json();
        setSchools(schoolsData.schools);

        // Fetch members data
        const membersResponse = await fetch(`${process.env.PUBLIC_URL}/data/members.json`);
        const membersData = await membersResponse.json();
        setMembers(membersData.members);

        setLoading(false);
      } catch (error) {
        console.error('Error in MemberMap:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && !error && schools.length > 0) {
      // Check if Google Maps script is already loaded
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // Load Google Maps script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.onload = initializeMap;
      script.onerror = () => {
        setError('Failed to load Google Maps script');
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [loading, error, schools]);

  const initializeMap = () => {
    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20, lng: 0 },
        zoom: 2,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#7c93a3" }]
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Add markers for each school
      schools.forEach(school => {
        const memberCount = getMemberCountBySchool(school.name);
        const marker = new window.google.maps.Marker({
          position: { lat: school.location.lat, lng: school.location.lng },
          map: map,
          title: `${school.name} (${memberCount} members)`,
          label: {
            text: memberCount.toString(),
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="margin: 0 0 8px 0;">${school.name}</h3>
              <p style="margin: 0;">Members: ${memberCount}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        markersRef.current.push(marker);
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setError('Failed to initialize Google Maps');
    }
  };

  const getMemberCountBySchool = (schoolName) => {
    return members.filter(member => member.school === schoolName).length;
  };

  if (loading) {
    return <Typography>Loading map...</Typography>;
  }

  if (error) {
    return (
      <Box sx={{ p: 2, backgroundColor: 'error.light', color: 'error.contrastText', borderRadius: 1 }}>
        <Typography variant="body1">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '500px', width: '100%', position: 'relative' }}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </Box>
  );
};

export default MemberMap; 