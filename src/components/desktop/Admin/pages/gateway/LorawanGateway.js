import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Snackbar, FormControl,InputAdornment, InputLabel, Select, MenuItem, IconButton, Drawer, CircularProgress } from '@mui/material';
import {  Add } from '@mui/icons-material';
import { RiTestTubeFill } from "react-icons/ri";
import GatewayManagement from './LorawanManage';

function LoRaWANGateway() {
  const [gatewayDetails, setGatewayDetails] = useState({
    gatewayID: '',
    ipAddress: '',
    connectionPort: '',
    mqttBroker: 'mqtt://localhost:1883',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Handle form field changes
  const handleInputChange = (e) => {
    setGatewayDetails({
      ...gatewayDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Simulate testing the connection
  const handleTestConnection = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (gatewayDetails.ipAddress === '192.168.1.1' && gatewayDetails.connectionPort === '1883') {
        setSnackbarMessage('Connection successful!');
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage('Connection failed. Please check gateway details.');
        setOpenSnackbar(true);
      }
    }, 2000); // Simulate connection testing delay
  };

  // Handle closing Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ margin: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <GatewayManagement/>
      <Typography variant="h5" component="h1" gutterBottom>LoRaWAN Gateway Configuration</Typography>

      {/* Button to open the drawer */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setDrawerOpen(true)}
        sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <Add />
        Configure Gateway
      </Button>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: snackbarMessage.includes('successful') ? 'green' : 'red',
            color: '#fff',
          },
        }}
      />

      {/* Drawer for configuring the gateway */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ width: 400 }}
      >
        <Box sx={{ width: 400, padding: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>Gateway Configuration</Typography>

          {/* Gateway Form */}
          <TextField
            label="Gateway ID"
            variant="outlined"
            name="gatewayID"
            value={gatewayDetails.gatewayID}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: '15px' }}
            placeholder="e.g., GW001"
          />
          <TextField
            label="IP Address"
            variant="outlined"
            name="ipAddress"
            value={gatewayDetails.ipAddress}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: '15px' }}
            placeholder="e.g., 192.168.1.1"
          />
          <TextField
            label="Connection Port"
            variant="outlined"
            name="connectionPort"
            value={gatewayDetails.connectionPort}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: '15px' }}
            placeholder="e.g., 1883"
            InputProps={{
              startAdornment: <InputAdornment position="start">Port</InputAdornment>,
            }}
          />
          <FormControl fullWidth sx={{ marginBottom: '15px' }}>
            <InputLabel>MQTT Broker</InputLabel>
            <Select
              name="mqttBroker"
              value={gatewayDetails.mqttBroker}
              onChange={handleInputChange}
              label="MQTT Broker"
            >
              <MenuItem value="mqtt://localhost:1883">mqtt://localhost:1883</MenuItem>
              <MenuItem value="mqtt://broker.hivemq.com:1883">mqtt://broker.hivemq.com:1883</MenuItem>
              <MenuItem value="mqtt://test.mosquitto.org:1883">mqtt://test.mosquitto.org:1883</MenuItem>
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
            Test Connection
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

export default LoRaWANGateway;
