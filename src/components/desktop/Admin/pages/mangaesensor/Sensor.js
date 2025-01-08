import React, { useState } from 'react';
import {
  Button,
  TextField,
  Drawer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Snackbar,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';

function SensorManagement() {
  const [sensors, setSensors] = useState([
    {
      id: 1,
      sensorID: 'S-001',
      type: 'Temperature',
      location: 'Room 1',
      // value: 25,
      unit: '°C',
      status: 'Active',
      deviceEui: '1234567890',
      dataFrequency: '30s',
      associatedGateway: 'GW-001',
    },
    {
      id: 2,
      sensorID: 'S-002',
      type: 'Humidity',
      location: 'Room 2',
      // value: 45,
      unit: '%',
      status: 'Inactive',
      deviceEui: '0987654321',
      dataFrequency: '60s',
      associatedGateway: 'GW-002',
    }
  ]);

  const [newSensor, setNewSensor] = useState({
    sensorID: '',
    type: '',
    location: '',
    value: '',
    unit: '',
    status: '',
    deviceEui: '',
    dataFrequency: '',
    associatedGateway: '',
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const sensorTypes = ['Temperature', 'Humidity', 'Pressure', 'Light'];
  const statusOptions = ['Active', 'Inactive'];
  const gateways = ['GW-001', 'GW-002', 'GW-003']; // Dummy data for gateways
  const frequencies = ['30s', '60s', '120s']; // Dummy data for frequency

  // Add new sensor
  const handleAddSensor = () => {
    if (
      newSensor.sensorID &&
      newSensor.type &&
      newSensor.location &&
      newSensor.value &&
      newSensor.unit &&
      newSensor.status &&
      newSensor.deviceEui &&
      newSensor.dataFrequency &&
      newSensor.associatedGateway
    ) {
      setSensors([...sensors, { id: sensors.length + 1, ...newSensor }]);
      setNewSensor({
        sensorID: '',
        type: '',
        location: '',
        value: '',
        unit: '',
        status: '',
        deviceEui: '',
        dataFrequency: '',
        associatedGateway: '',
      });
      setSnackbarMessage('Sensor added successfully!');
      setOpenSnackbar(true);
      setDrawerOpen(false);
    } else {
      setSnackbarMessage('Please fill all fields!');
      setOpenSnackbar(true);
    }
  };

  // Edit sensor
  const handleEdit = (id) => {
    const sensorToEdit = sensors.find(sensor => sensor.id === id);
    setNewSensor(sensorToEdit);
    setDrawerOpen(true);
  };

  // Delete sensor
  const handleDelete = (id) => {
    const updatedSensors = sensors.filter(sensor => sensor.id !== id);
    setSensors(updatedSensors);
    setSnackbarMessage('Sensor deleted successfully!');
    setOpenSnackbar(true);
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ margin: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sensor Management
      </Typography>

      {/* Add Sensor Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setDrawerOpen(true)}
        sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <Add />
        Add Sensor
      </Button>

      {/* Table to display sensors */}
      <TableContainer component={Paper} sx={{ marginTop: '30px', borderRadius: '8px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>#</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Sensor ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Location</TableCell>
              {/* <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Value</TableCell> */}
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Unit</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Device EUI</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Data Frequency</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Associated Gateway</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sensors.map((sensor) => (
              <TableRow key={sensor.id}>
                <TableCell>{sensor.id}</TableCell>
                <TableCell>{sensor.sensorID}</TableCell>
                <TableCell>{sensor.type}</TableCell>
                <TableCell>{sensor.location}</TableCell>
                {/* <TableCell>{sensor.value}</TableCell> */}
                <TableCell>{sensor.unit}</TableCell>
                <TableCell>{sensor.status}</TableCell>
                <TableCell>{sensor.deviceEui}</TableCell>
                <TableCell>{sensor.dataFrequency}</TableCell>
                <TableCell>{sensor.associatedGateway}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(sensor.id)} color="primary" sx={{ marginRight: '10px' }}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(sensor.id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: snackbarMessage.includes('success') ? 'green' : 'red',
            color: '#fff'
          }
        }}
      />

      {/* Drawer for adding/editing sensor */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 400, padding: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            Add/Edit Sensor
          </Typography>

          <TextField
            label="Sensor ID"
            variant="outlined"
            value={newSensor.sensorID}
            onChange={(e) => setNewSensor({ ...newSensor, sensorID: e.target.value })}
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <FormControl fullWidth sx={{ marginBottom: '15px' }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={newSensor.type}
              onChange={(e) => setNewSensor({ ...newSensor, type: e.target.value })}
              label="Type"
            >
              {sensorTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Location"
            variant="outlined"
            value={newSensor.location}
            onChange={(e) => setNewSensor({ ...newSensor, location: e.target.value })}
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          {/* <TextField
            label="Value"
            variant="outlined"
            value={newSensor.value}
            onChange={(e) => setNewSensor({ ...newSensor, value: e.target.value })}
            fullWidth
            sx={{ marginBottom: '15px' }}
          /> */}
          <TextField
            label="Unit"
            variant="outlined"
            value={newSensor.unit}
            onChange={(e) => setNewSensor({ ...newSensor, unit: e.target.value })}
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <FormControl fullWidth sx={{ marginBottom: '15px' }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={newSensor.status}
              onChange={(e) => setNewSensor({ ...newSensor, status: e.target.value })}
              label="Status"
            >
              {statusOptions.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Device EUI"
            variant="outlined"
            value={newSensor.deviceEui}
            onChange={(e) => setNewSensor({ ...newSensor, deviceEui: e.target.value })}
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <FormControl fullWidth sx={{ marginBottom: '15px' }}>
            <InputLabel>Data Frequency</InputLabel>
            <Select
              value={newSensor.dataFrequency}
              onChange={(e) => setNewSensor({ ...newSensor, dataFrequency: e.target.value })}
              label="Data Frequency"
            >
              {frequencies.map((freq, index) => (
                <MenuItem key={index} value={freq}>
                  {freq}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: '15px' }}>
            <InputLabel>Associated Gateway</InputLabel>
            <Select
              value={newSensor.associatedGateway}
              onChange={(e) => setNewSensor({ ...newSensor, associatedGateway: e.target.value })}
              label="Associated Gateway"
            >
              {gateways.map((gateway, index) => (
                <MenuItem key={index} value={gateway}>
                  {gateway}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSensor}
            fullWidth
            sx={{ marginTop: '20px' }}
          >
            {newSensor.id ? 'Update Sensor' : 'Add Sensor'}
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

export default SensorManagement;
