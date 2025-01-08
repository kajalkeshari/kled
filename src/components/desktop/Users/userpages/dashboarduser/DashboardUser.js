import React from 'react';
import { Box, Grid, Typography, Paper, Button } from '@mui/material';
import { Devices, NotificationsActive, SettingsSystemDaydream, GetApp, HelpOutline, Group, InsertChart, LocationCity } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DashboardUser = () => {
  // DashboardUser items data
  const dashboardUserItems = [
    { icon: <Devices />, label: 'Sensor Monitoring', description: 'Monitor real-time and historical sensor data.' },
    { icon: <InsertChart />, label: 'Real-Time Data Visualization', description: 'View real-time sensor data with visual graphs.' },
    { icon: <LocationCity />, label: 'Site and Sensor Overview', description: 'View site and sensor-specific data and statuses.' },
    { icon: <NotificationsActive />, label: 'Alerts and Notifications', description: 'View and manage active alerts and configure notifications.' },
    { icon: <SettingsSystemDaydream />, label: 'Sensor Management', description: 'Add, edit, or remove sensors and configure settings.' },
    { icon: <GetApp />, label: 'Reports and Data Export', description: 'Generate and export reports in various formats.' },
    { icon: <HelpOutline />, label: 'Help and Support', description: 'Access help guides and submit support tickets.' },
    { icon: <Group />, label: 'Sensor Groups and Categorization', description: 'Group sensors by type or location and filter them.' },
  ];

  const navigate = useNavigate();

  // Function to handle "View Details" button click
  const handleViewDetails = (label) => {
    // Navigate to a new page, for example "/details/:label"
    navigate(`/user_details/${label}`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2}}>Dashboard</Typography>
      <Grid container spacing={3}>
        {dashboardUserItems.map((item, index) => (
          <Grid item xs={8} sm={6} md={4} key={index}>
            <Paper
              elevation={2}
              sx={{
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                borderRadius: 2,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                  backgroundColor: '#e1f5fe',
                },
              }}
            >
              <Box sx={{ fontSize: 40, color: 'teal' }}>
                {item.icon}
              </Box>
              <Typography variant="h7" sx={{ marginTop: 0, fontWeight: 'bold' }}>
                {item.label}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 0, color: 'gray' }}>
                {item.description}
              </Typography>
              <Button
                variant="contained"
                size='small'
                color="primary"
                sx={{ marginTop: 1 }}
                onClick={() => handleViewDetails(item.label)}
              >
                View Details
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardUser;
