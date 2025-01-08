import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  CircularProgress,
  Snackbar,
  Grid,
  Paper,
} from '@mui/material';
import { AddAlert, Notifications, Sms, Email, Settings } from '@mui/icons-material';

function Alerts() {
  const [alertConfig, setAlertConfig] = useState({
    temperature: '',
    humidity: '',
    co2: '',
    visualAlarm: false,
    audioAlarm: false,
    emailNotification: false,
    smsNotification: false,
    escalationRule: '',
  });

  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    setAlertConfig({
      ...alertConfig,
      [e.target.name]: e.target.value,
    });
  };

  // Handle switch toggle
  const handleSwitchChange = (e) => {
    setAlertConfig({
      ...alertConfig,
      [e.target.name]: e.target.checked,
    });
  };

  // Handle save alert configuration
  const handleSaveConfiguration = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbarMessage('Alert Configuration Saved Successfully!');
      setOpenSnackbar(true);
    }, 2000);
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ margin: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Alert Configuration
      </Typography>

      <Paper sx={{ padding: '20px', borderRadius: '8px' }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Set Threshold Values for Sensors:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Temperature Threshold (°C)"
              variant="outlined"
              name="temperature"
              value={alertConfig.temperature}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: '15px' }}
              type="number"
              placeholder="e.g., 30"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Humidity Threshold (%)"
              variant="outlined"
              name="humidity"
              value={alertConfig.humidity}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: '15px' }}
              type="number"
              placeholder="e.g., 80"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="CO2 Threshold (ppm)"
              variant="outlined"
              name="co2"
              value={alertConfig.co2}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: '15px' }}
              type="number"
              placeholder="e.g., 1000"
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ marginTop: '20px' }}>
          Configure Alert Types:
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={alertConfig.visualAlarm}
              onChange={handleSwitchChange}
              name="visualAlarm"
              color="secondary"
            />
          }
          label="Visual Alarm"
        />
        <FormControlLabel
          control={
            <Switch
              checked={alertConfig.audioAlarm}
              onChange={handleSwitchChange}
              name="audioAlarm"
              color="secondary"
            />
          }
          label="Audio Alarm"
        />
        <FormControlLabel
          control={
            <Switch
              checked={alertConfig.emailNotification}
              onChange={handleSwitchChange}
              name="emailNotification"
              color="primary"
            />
          }
          label="Email Notification"
          sx={{ marginBottom: '15px' }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={alertConfig.smsNotification}
              onChange={handleSwitchChange}
              name="smsNotification"
              color="primary"
            />
          }
          label="SMS Notification"
        />

        <FormControl fullWidth sx={{ marginTop: '20px', marginBottom: '15px' }}>
          <InputLabel>Escalation Rule</InputLabel>
          <Select
            value={alertConfig.escalationRule}
            name="escalationRule"
            onChange={handleInputChange}
            label="Escalation Rule"
          >
            <MenuItem value="1">Notify Admin After 1 Hour</MenuItem>
            <MenuItem value="2">Notify Admin After 2 Hours</MenuItem>
            <MenuItem value="3">Notify Admin After 3 Hours</MenuItem>
          </Select>
        </FormControl>

        {/* Save Configuration Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveConfiguration}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '20px',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : <AddAlert />}
          Save Alert Configuration
        </Button>
      </Paper>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: snackbarMessage.includes('Successfully') ? 'green' : 'red',
            color: '#fff',
          },
        }}
      />
    </Box>
  );
}

export default Alerts;
