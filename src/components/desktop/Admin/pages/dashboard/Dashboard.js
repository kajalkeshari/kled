import React from 'react';
import { Grid, Box, Typography, Button, IconButton } from '@mui/material';
import { AccessAlarm, BarChart, Notifications, Settings } from '@mui/icons-material';

const Dashboard = () => {
  return (
    <Box sx={{ padding: 3 ,}}>
      <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 3 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {/* First Row of Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: 2,
              textAlign: 'center',
            }}
          >
            <AccessAlarm sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Sensor Monitoring
            </Typography>
            <Typography sx={{ color: 'gray', marginBottom: 1 }}>
              Real-time data from all sensors
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              View Data
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: 2,
              textAlign: 'center',
            }}
          >
            <BarChart sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Analytics
            </Typography>
            <Typography sx={{ color: 'gray', marginBottom: 1 }}>
              Visualize sensor trends
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              View Analytics
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: 2,
              textAlign: 'center',
            }}
          >
            <Notifications sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Alerts
            </Typography>
            <Typography sx={{ color: 'gray', marginBottom: 1 }}>
              View active and past alerts
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              Manage Alerts
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: 2,
              textAlign: 'center',
            }}
          >
            <Settings sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Settings
            </Typography>
            <Typography sx={{ color: 'gray', marginBottom: 1 }}>
              Manage system configuration
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              Configure Settings
            </Button>
          </Box>
        </Grid>

        {/* Second Row of Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: 2,
              textAlign: 'center',
            }}
          >
            <BarChart sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Historical Data
            </Typography>
            <Typography sx={{ color: 'gray', marginBottom: 1 }}>
              Access data from past periods
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              View History
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: 2,
              textAlign: 'center',
            }}
          >
            <AccessAlarm sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              System Alerts
            </Typography>
            <Typography sx={{ color: 'gray', marginBottom: 1 }}>
              View and acknowledge system alerts
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              Manage Alerts
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: 2,
              textAlign: 'center',
            }}
          >
            <Settings sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Backup & Restore
            </Typography>
            <Typography sx={{ color: 'gray', marginBottom: 1 }}>
              Manage backups of your data
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              Manage Backups
            </Button>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}

export default Dashboard;
