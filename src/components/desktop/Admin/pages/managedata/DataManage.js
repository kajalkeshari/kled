import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { FileDownload, QueryStats } from '@mui/icons-material';

function DataManage() {
  const [dataType, setDataType] = useState('');
  const [exportLoading, setExportLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
  };

  const handleExportData = () => {
    setExportLoading(true);
    setTimeout(() => {
      setExportLoading(false);
      setSnackbarMessage('Data Exported Successfully!');
      setSnackbarOpen(true);
    }, 2000);
  };

  const handleGenerateReport = () => {
    setReportLoading(true);
    setTimeout(() => {
      setReportLoading(false);
      setSnackbarMessage('Report Generated Successfully!');
      setSnackbarOpen(true);
    }, 3000);
  };

  // Example Sensor Data
  const data = [
    {
      sensorId: 'Sensor 1',
      sensorType: 'Temperature & Humidity',
      temperature: 22.5,
      humidity: 60,
      timestamp: '2024-12-23 12:00:00',
    },
    {
      sensorId: 'Sensor 2',
      sensorType: 'Pressure Sensor',
      temperature: 25.0,
      humidity: 65,
      timestamp: '2024-12-23 12:05:00',
    },
    {
      sensorId: 'Sensor 3',
      sensorType: 'CO2 Sensor',
      temperature: 20.0,
      humidity: 55,
      timestamp: '2024-12-23 12:10:00',
    },
  ];

  return (
    <Box sx={{ margin: '30px' }}>
      <Typography variant="h5" gutterBottom>
        Data Management
      </Typography>

      {/* Data Type Selection */}
      <FormControl fullWidth sx={{ marginBottom: '20px' }}>
        <InputLabel>Data Type</InputLabel>
        <Select value={dataType} onChange={handleDataTypeChange} label="Data Type">
          <MenuItem value="realTime">Real-Time Data</MenuItem>
          <MenuItem value="historical">Historical Data</MenuItem>
        </Select>
      </FormControl>

      {/* Data Display */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Sensor Data</Typography>
          <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sensor ID</TableCell>
                  <TableCell>Sensor Type</TableCell>
                  <TableCell>Temperature (°C)</TableCell>
                  <TableCell>Humidity (%)</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.sensorId}</TableCell>
                    <TableCell>{row.sensorType}</TableCell>
                    <TableCell>{row.temperature}</TableCell>
                    <TableCell>{row.humidity}</TableCell>
                    <TableCell>{row.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Export and Report Actions */}
      <Box sx={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExportData}
          sx={{ display: 'flex', alignItems: 'center' }}
          disabled={exportLoading}
        >
          {exportLoading ? (
            <CircularProgress size={24} sx={{ color: 'white', marginRight: '10px' }} />
          ) : (
            <FileDownload sx={{ marginRight: '10px' }} />
          )}
          Export Data
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleGenerateReport}
          sx={{ display: 'flex', alignItems: 'center' }}
          disabled={reportLoading}
        >
          {reportLoading ? (
            <CircularProgress size={24} sx={{ color: 'white', marginRight: '10px' }} />
          ) : (
            <QueryStats sx={{ marginRight: '10px' }} />
          )}
          Generate Report
        </Button>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
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

export default DataManage;
