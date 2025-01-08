import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Snackbar, FormControl, InputLabel, Select, MenuItem, IconButton, CircularProgress, InputAdornment } from '@mui/material';
import {  AddCircle } from '@mui/icons-material';
import { RiTestTubeFill } from "react-icons/ri";

function MQTTBroker() {
  const [mqttDetails, setMqttDetails] = useState({
    brokerIP: '',
    brokerPort: '',
    username: '',
    password: '',
    mqttTopic: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    setMqttDetails({
      ...mqttDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Simulate testing the MQTT connection
  const handleTestConnection = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mqttDetails.brokerIP === '192.168.0.1' && mqttDetails.brokerPort === '1883') {
        setSnackbarMessage('MQTT Connection Successful!');
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage('Failed to connect. Please check the broker details.');
        setOpenSnackbar(true);
      }
    }, 2000); // Simulate connection delay
  };

  // Handle closing Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ margin: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Typography variant="h5" component="h1" gutterBottom>MQTT Broker Configuration</Typography>

      {/* MQTT Broker Settings Form */}
      <TextField
        label="MQTT Broker IP"
        variant="outlined"
        size='small'
        name="brokerIP"
        value={mqttDetails.brokerIP}
        onChange={handleInputChange}
        fullWidth
        sx={{ marginBottom: '15px' }}
        placeholder="e.g., 192.168.0.1"
      />
      <TextField
        label="Port"
        variant="outlined"
         size='small'
        name="brokerPort"
        value={mqttDetails.brokerPort}
        onChange={handleInputChange}
        fullWidth
        sx={{ marginBottom: '15px' }}
        placeholder="e.g., 1883"
        InputProps={{
          startAdornment: <InputAdornment position="start">Port</InputAdornment>,
        }}
      />
      <TextField
        label="Username"
        variant="outlined"
         size='small'
        name="username"
        value={mqttDetails.username}
        onChange={handleInputChange}
        fullWidth
        sx={{ marginBottom: '15px' }}
        placeholder="e.g., user123"
      />
      <TextField
        label="Password"
        variant="outlined"
         size='small'
        type="password"
        name="password"
        value={mqttDetails.password}
        onChange={handleInputChange}
        fullWidth
        sx={{ marginBottom: '15px' }}
        placeholder="e.g., password123"
      />

      {/* Assign MQTT Topics */}
      <FormControl fullWidth sx={{ marginBottom: '15px' }}>
        <InputLabel>MQTT Topic</InputLabel>
        <Select
          name="mqttTopic"
          value={mqttDetails.mqttTopic}
           size='small'
          onChange={handleInputChange}
          label="MQTT Topic"
        >
          <MenuItem value="temperature">temperature</MenuItem>
          <MenuItem value="humidity">humidity</MenuItem>
          <MenuItem value="CO2">CO2</MenuItem>
     
        </Select>
      </FormControl>

      {/* Test Connection Button */}
      <Button
        onClick={handleTestConnection}
        variant="contained"
        color="secondary"
        sx={{ width: '100%', marginBottom: '20px' }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : <RiTestTubeFill />}
        Test MQTT Connection
      </Button>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: snackbarMessage.includes('Successful') ? 'green' : 'red',
            color: '#fff',
          },
        }}
      />

      {/* Add Button to add the MQTT Broker */}
      <Button
        variant="contained"
        color="primary"
        sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <AddCircle />
        Add MQTT Broker
      </Button>
    </Box>
  );
}

export default MQTTBroker;
