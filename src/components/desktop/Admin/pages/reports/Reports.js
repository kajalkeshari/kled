import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Download, Share, History, FilterList } from '@mui/icons-material';
import { saveAs } from 'file-saver'; // For file download functionality
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reportType, setReportType] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [site, setSite] = useState('');
  const [sensorType, setSensorType] = useState('');
  const [openHistoryDialog, setOpenHistoryDialog] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [generatedReports, setGeneratedReports] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Dummy data for site and sensor types
  const sites = ['Site 1', 'Site 2', 'Site 3'];
  const sensorTypes = ['Temperature', 'Humidity', 'CO2'];

  const timeRanges = [
    { label: 'Last 24 Hours', value: '24h' },
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 30 Days', value: '30d' },
  ];

  // Dummy chart data
  const generateChartData = () => {
    return [
      { time: '12:00', temp: 22, humidity: 50, co2: 400 },
      { time: '12:30', temp: 23, humidity: 55, co2: 410 },
      { time: '13:00', temp: 24, humidity: 60, co2: 420 },
      { time: '13:30', temp: 25, humidity: 65, co2: 430 },
      { time: '14:00', temp: 26, humidity: 70, co2: 440 },
    ];
  };

  // Handle report generation
  const handleGenerateReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        reportType,
        timeRange,
        site,
        sensorType,
        date: new Date().toLocaleString(),
      };
      setGeneratedReports((prevReports) => [...prevReports, newReport]);
      setChartData(generateChartData()); // Generating dummy data for the chart
      setSnackbarMessage('Report generated successfully!');
      setSnackbarOpen(true);
      setIsLoading(false);
    }, 2000);
  };

  // Handle export
  const handleExportReport = (format) => {
    setIsLoading(true);
    setTimeout(() => {
      const fileName = `report-${Date.now()}`;
      let fileContent = 'Sample Report Data';
      if (format === 'pdf') {
        fileContent = 'Sample PDF Report';
      } else if (format === 'csv') {
        fileContent = 'Sample CSV Report';
      } else if (format === 'excel') {
        fileContent = 'Sample Excel Report';
      }
      const blob = new Blob([fileContent], { type: 'application/octet-stream' });
      saveAs(blob, `${fileName}.${format}`);
      setSnackbarMessage('Report exported successfully!');
      setSnackbarOpen(true);
      setIsLoading(false);
    }, 2000);
  };

  // Open report history dialog
  const handleOpenHistoryDialog = () => {
    setOpenHistoryDialog(true);
  };

  // Close report history dialog
  const handleCloseHistoryDialog = () => {
    setOpenHistoryDialog(false);
  };

  return (
    <Box sx={{ padding: '30px' }}>
      <Typography variant="h5" gutterBottom>
        Report Management
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: '20px', boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              Generate Report
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: '15px' }}>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                label="Report Type"
              >
                <MenuItem value="overview">Overview</MenuItem>
                <MenuItem value="sensor-data">Sensor Data</MenuItem>
                <MenuItem value="site-performance">Site Performance</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: '15px' }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                label="Time Range"
              >
                {timeRanges.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: '15px' }}>
              <InputLabel>Site</InputLabel>
              <Select
                value={site}
                onChange={(e) => setSite(e.target.value)}
                label="Site"
              >
                {sites.map((site) => (
                  <MenuItem key={site} value={site}>
                    {site}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: '15px' }}>
              <InputLabel>Sensor Type</InputLabel>
              <Select
                value={sensorType}
                onChange={(e) => setSensorType(e.target.value)}
                label="Sensor Type"
              >
                {sensorTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateReport}
              fullWidth
              startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null}
            >
              {isLoading ? 'Generating...' : 'Generate Report'}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: '20px', boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              Export or Share Report
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Download />}
              onClick={() => handleExportReport('pdf')}
              fullWidth
              sx={{ marginBottom: '10px' }}
            >
              Export as PDF
            </Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<Download />}
              onClick={() => handleExportReport('excel')}
              fullWidth
              sx={{ marginBottom: '10px' }}
            >
              Export as Excel
            </Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<Download />}
              onClick={() => handleExportReport('csv')}
              fullWidth
              sx={{ marginBottom: '10px' }}
            >
              Export as CSV
            </Button>

            <Button
              variant="contained"
              color="secondary"
              startIcon={<Share />}
              fullWidth
              sx={{ marginBottom: '10px' }}
            >
              Share via Email
            </Button>

            <Button
              variant="contained"
              color="secondary"
              startIcon={<History />}
              onClick={handleOpenHistoryDialog}
              fullWidth
            >
              View Report History
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Graph Section */}
      {chartData.length > 0 && (
        <Paper sx={{ padding: '20px', marginTop: '30px', boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Sensor Data Graph
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
              <Line type="monotone" dataKey="co2" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />

      {/* Report History Dialog */}
      <Dialog open={openHistoryDialog} onClose={handleCloseHistoryDialog}>
        <DialogTitle>Report History</DialogTitle>
        <DialogContent>
          <Typography variant="body1">History of generated reports will go here.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHistoryDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reports;
