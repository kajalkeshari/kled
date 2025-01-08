import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GetSensor = () => {
  const [sensorData, setSensorData] = useState([]);

  // Fetch sensor data from backend
  useEffect(() => {
    // Function to fetch the data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sensor-data');
        
        // Format the data
        const formattedData = response.data.map((item) => {
          let messageData = {};
          
          // Parse the message field if it's a JSON string
          try {
            messageData = JSON.parse(item.message);
          } catch (e) {
            console.error('Error parsing message data:', e);
          }

          // Return the formatted data with parsed fields from message
          return {
            id: item.id,
            topic: item.topic,
            battery: messageData.battery || null,
            data: messageData.data || null,
            devEUI: messageData.devEUI || null,
            co2: messageData.co2 || null,
            humidity: messageData.humidity || null,
            light_level: messageData.light_level || null,
            temperature: messageData.temperature || null,
            timestamp: new Date(item.timestamp).toLocaleTimeString(),
          };
        });

        setSensorData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Initial data fetch
    fetchData();

    // Set up polling to fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000); // 5000ms = 5 seconds

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sensor Data Dashboard
      </Typography>

      {/* Table */}
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Sensor Data Table
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Topic</strong></TableCell>
                <TableCell><strong>Battery</strong></TableCell>
                {/* <TableCell><strong>Data</strong></TableCell> */}
                <TableCell><strong>devEUI</strong></TableCell>
                <TableCell><strong>CO2</strong></TableCell>
                <TableCell><strong>Humidity</strong></TableCell>
                <TableCell><strong>Light Level</strong></TableCell>
                <TableCell><strong>Temperature</strong></TableCell>
                <TableCell><strong>Timestamp</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sensorData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.topic}</TableCell>
                  <TableCell>{row.battery}</TableCell>
                  {/* <TableCell>{row.data}</TableCell> */}
                  <TableCell>{row.devEUI}</TableCell>
                  <TableCell>{row.co2}</TableCell>
                  <TableCell>{row.humidity}</TableCell>
                  <TableCell>{row.light_level}</TableCell>
                  <TableCell>{row.temperature}</TableCell>
                  <TableCell>{row.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Line Chart */}
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Sensor Data Chart
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={sensorData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  );
};

export default GetSensor;
