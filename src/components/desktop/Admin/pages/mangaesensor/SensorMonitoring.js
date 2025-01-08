import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Tab,
  Tabs,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import { Thermostat, Opacity, Cloud } from "@mui/icons-material";
import { Line } from "recharts";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const SensorMonitoring = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [realTimeData, setRealTimeData] = useState({
    temperature: 0,
    humidity: 0,
    co2: 0,
  });
  const [historicalData, setHistoricalData] = useState({
    labels: [],
    temperature: [],
    humidity: [],
    co2: [],
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData({
        temperature: (20 + Math.random() * 10).toFixed(1),
        humidity: (50 + Math.random() * 10).toFixed(1),
        co2: (400 + Math.random() * 100).toFixed(1),
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Simulate historical data
  useEffect(() => {
    const generateHistoricalData = () => {
      const labels = Array.from({ length: 24 }, (_, i) => `${i + 1}:00`);
      const temperature = labels.map(() => (20 + Math.random() * 10).toFixed(1));
      const humidity = labels.map(() => (50 + Math.random() * 10).toFixed(1));
      const co2 = labels.map(() => (400 + Math.random() * 100).toFixed(1));

      setHistoricalData({ labels, temperature, humidity, co2 });
    };

    generateHistoricalData();
  }, []);

  // Tab Change Handler
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Sensor Monitoring
      </Typography>

      {/* Tabs for Real-Time and Historical Data */}
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 4 }}>
        <Tab label="Real-Time Data" />
        <Tab label="Historical Data" />
      </Tabs>

      {activeTab === 0 && (
        <Box>
          {/* Real-Time Data Widgets */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Thermostat fontSize="large" color="primary" />
                    <Typography variant="h6">Temperature</Typography>
                  </Box>
                  <Typography variant="h4" color="text.secondary" sx={{ mt: 2 }}>
                    {realTimeData.temperature}°C
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Opacity fontSize="large" color="primary" />
                    <Typography variant="h6">Humidity</Typography>
                  </Box>
                  <Typography variant="h4" color="text.secondary" sx={{ mt: 2 }}>
                    {realTimeData.humidity}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Cloud fontSize="large" color="primary" />
                    <Typography variant="h6">CO2</Typography>
                  </Box>
                  <Typography variant="h4" color="text.secondary" sx={{ mt: 2 }}>
                    {realTimeData.co2} ppm
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          {/* Historical Data Graphs */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Historical Data (Last 24 Hours)
            </Typography>
            <Line
              data={{
                labels: historicalData.labels,
                datasets: [
                  {
                    label: "Temperature (°C)",
                    data: historicalData.temperature,
                    borderColor: "#FF6384",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    tension: 0.4,
                  },
                  {
                    label: "Humidity (%)",
                    data: historicalData.humidity,
                    borderColor: "#36A2EB",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    tension: 0.4,
                  },
                  {
                    label: "CO2 (ppm)",
                    data: historicalData.co2,
                    borderColor: "#FFCE56",
                    backgroundColor: "rgba(255, 206, 86, 0.2)",
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default SensorMonitoring;
