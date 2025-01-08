import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Grid, Button, Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DetailsPage = () => {
  const { label } = useParams(); // Get the label from the URL
  const navigate = useNavigate();

  // Sample detailed information (can be dynamically fetched or passed as props)
  const details = {
    'Sensor Monitoring': {
      description: 'Monitor real-time and historical sensor data.',
      moreInfo: 'This section allows users to view sensor data in real-time, as well as look at historical data trends and insights.',
      systemRequirements: 'Requires sensors with real-time data streaming capability.',
      howToGuide: 'To start monitoring, ensure your sensors are connected and active in the system settings.',
    },
    'Alerts and Notifications': {
      description: 'View and manage active alerts and configure notifications.',
      moreInfo: 'Users can configure different types of alerts and notifications for sensors and devices, ensuring timely responses to issues.',
      systemRequirements: 'Requires alert configuration permissions.',
      howToGuide: 'To configure alerts, navigate to the settings page and set the desired thresholds.',
    },
    'Sensor Management': {
      description: 'Add, edit, or remove sensors and configure settings.',
      moreInfo: 'This section allows users to manage sensor configurations, add new devices, or remove outdated sensors from the system.',
      systemRequirements: 'Requires admin access to add or remove sensors.',
      howToGuide: 'Go to the Sensor Management tab to add, update, or remove sensors from the list.',
    },
    // Add more item details as needed
  };

  const itemDetails = details[label] || {};

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              borderRadius: 3,
              backgroundColor: '#f9f9f9',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#00796b' }}>
              {label}
            </Typography>

            <Box sx={{ marginTop: 3 }}>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                {itemDetails.description}
              </Typography>
            </Box>

            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body2" sx={{ fontSize: '1rem', color: 'gray', lineHeight: 1.6 }}>
                {itemDetails.moreInfo}
              </Typography>
            </Box>
            
            {/* New Section for System Requirements */}
            <Box sx={{ marginTop: 3 }}>
              <Paper elevation={2} sx={{ padding: 2, backgroundColor: '#e0f7fa' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00796b' }}>
                  System Requirements
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  {itemDetails.systemRequirements}
                </Typography>
              </Paper>
            </Box>

            {/* New Section for How-to Guide */}
            <Box sx={{ marginTop: 3 }}>
              <Paper elevation={2} sx={{ padding: 2, backgroundColor: '#f1f8e9' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00796b' }}>
                  How to Get Started
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  {itemDetails.howToGuide}
                </Typography>
              </Paper>
            </Box>

            <Box sx={{ marginTop: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBack />}
                sx={{
                  paddingX: 4,
                  paddingY: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                }}
                onClick={() => navigate('/')}
              >
                Back to Dashboard
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailsPage;
