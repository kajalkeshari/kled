import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Paper, IconButton, Tabs, Tab } from '@mui/material';
import { Thermostat, WaterDrop, DeviceThermostat } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const SensorMonitoring = () => {
  // Sample real-time data (can be fetched from an API or database)
  const [realTimeData, setRealTimeData] = useState({
    temperature: 22.5, // Example: 22.5°C
    humidity: 55, // Example: 55%
    co2: 400, // Example: 400 ppm
  });

  // Historical Data
  const [historicalData, setHistoricalData] = useState([
    { day: 'Mon', temperature: 22, humidity: 55 },
    { day: 'Tue', temperature: 24, humidity: 60 },
    { day: 'Wed', temperature: 25, humidity: 58 },
    { day: 'Thu', temperature: 23, humidity: 54 },
    { day: 'Fri', temperature: 22, humidity: 57 },
    { day: 'Sat', temperature: 24, humidity: 59 },
    { day: 'Sun', temperature: 26, humidity: 56 },
  ]);

  // Real-time data updates simulation (to be replaced with actual data)
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prevData) => ({
        temperature: (Math.random() * 5 + 20).toFixed(1), // Random temp between 20 and 25
        humidity: (Math.random() * 10 + 50).toFixed(0), // Random humidity between 50 and 60
        co2: (Math.random() * 50 + 400).toFixed(0), // Random CO2 level between 400 and 450
      }));
    }, 3000); // Update every 3 seconds (simulating real-time data)

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Chart Data for Real-Time Data
  const realTimeChartData = [
    { name: 'Time', temperature: realTimeData.temperature, humidity: realTimeData.humidity },
  ];

  // Tabs State
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Sensor Monitoring
      </Typography>

      {/* Tabs */}
      <Tabs value={value} onChange={handleChange} aria-label="sensor monitoring tabs">
        <Tab label="Real-Time Data" />
        <Tab label="Historical Data" />
      </Tabs>

      {/* Real-Time Data Tab */}
      {value === 0 && (
        <Box sx={{ marginTop: 3 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={4} md={3}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                <IconButton sx={{ fontSize: 40, color: 'teal' }}>
                  <Thermostat />
                </IconButton>
                <Typography variant="h6" sx={{ marginTop: 2 }}>Temperature</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'teal' }}>
                  {realTimeData.temperature}°C
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                <IconButton sx={{ fontSize: 40, color: 'blue' }}>
                  <WaterDrop />
                </IconButton>
                <Typography variant="h6" sx={{ marginTop: 2 }}>Humidity</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'blue' }}>
                  {realTimeData.humidity}%
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                <IconButton sx={{ fontSize: 40, color: 'green' }}>
                  <DeviceThermostat />
                </IconButton>
                <Typography variant="h6" sx={{ marginTop: 2 }}>CO₂ Level</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'green' }}>
                  {realTimeData.co2} ppm
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Real-Time Chart */}
          <Box sx={{ marginTop: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
              Real-Time Data Chart
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={realTimeChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
                <Line type="monotone" dataKey="humidity" stroke="#387908" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      )}

      {/* Historical Data Tab */}
      {value === 1 && (
        <Box sx={{ marginTop: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
            Historical Data
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00796b' }}>
                  Weekly Data
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
                    <Line type="monotone" dataKey="humidity" stroke="#387908" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default SensorMonitoring;
