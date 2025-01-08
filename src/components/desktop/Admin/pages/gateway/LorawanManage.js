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

function GatewayManagement() {
  const [gateways, setGateways] = useState([]);
  const [newGateway, setNewGateway] = useState({
    gatewayID: '',
    frequencyBand: '',
    networkServer: '',
    associatedSite: '',
    gatewayStatus: '',
    signalStrength: '',
    dataTransferRate: '',
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Gateway status and frequency options
  const frequencyBands = ['2.4 GHz', '5 GHz', 'LoRa'];
  const gatewayStatuses = ['Online', 'Offline'];
  
  const [logs, setLogs] = useState([
    { id: 1, activity: 'Gateway connected', type: 'Info', timestamp: '2025-01-04 10:00:00' },
    { id: 2, activity: 'Signal strength low', type: 'Error', timestamp: '2025-01-04 10:05:00' },
  ]);

  // Add new gateway
  const handleAddGateway = () => {
    if (
      newGateway.gatewayID &&
      newGateway.frequencyBand &&
      newGateway.networkServer &&
      newGateway.associatedSite &&
      newGateway.gatewayStatus &&
      newGateway.signalStrength &&
      newGateway.dataTransferRate
    ) {
      setGateways([...gateways, { id: gateways.length + 1, ...newGateway }]);
      setNewGateway({
        gatewayID: '',
        frequencyBand: '',
        networkServer: '',
        associatedSite: '',
        gatewayStatus: '',
        signalStrength: '',
        dataTransferRate: '',
      });
      setSnackbarMessage('Gateway added successfully!');
      setOpenSnackbar(true);
      setDrawerOpen(false);
    } else {
      setSnackbarMessage('Please fill all fields!');
      setOpenSnackbar(true);
    }
  };

  // Edit gateway
  const handleEdit = (id) => {
    const gatewayToEdit = gateways.find(gateway => gateway.id === id);
    setNewGateway(gatewayToEdit);
    setDrawerOpen(true);
  };

  // Delete gateway
  const handleDelete = (id) => {
    const updatedGateways = gateways.filter(gateway => gateway.id !== id);
    setGateways(updatedGateways);
    setSnackbarMessage('Gateway deleted successfully!');
    setOpenSnackbar(true);
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ margin: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gateway Management
      </Typography>

      {/* Add Gateway Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setDrawerOpen(true)}
        sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <Add />
        Add Gateway
      </Button>

      {/* Table to display gateways */}
      <TableContainer component={Paper} sx={{ marginTop: '30px', borderRadius: '8px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>#</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Gateway ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Frequency Band</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Network Server</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Associated Site</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Gateway Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Signal Strength</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Data Transfer Rate</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gateways.map((gateway) => (
              <TableRow key={gateway.id}>
                <TableCell>{gateway.id}</TableCell>
                <TableCell>{gateway.gatewayID}</TableCell>
                <TableCell>{gateway.frequencyBand}</TableCell>
                <TableCell>{gateway.networkServer}</TableCell>
                <TableCell>{gateway.associatedSite}</TableCell>
                <TableCell>{gateway.gatewayStatus}</TableCell>
                <TableCell>{gateway.signalStrength}</TableCell>
                <TableCell>{gateway.dataTransferRate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(gateway.id)} color="primary" sx={{ marginRight: '10px' }}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(gateway.id)} color="secondary">
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

      {/* Drawer for adding/editing gateway */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 400, padding: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            Add/Edit Gateway
          </Typography>

          <TextField
            label="Gateway ID"
            variant="outlined"
            value={newGateway.gatewayID}
            onChange={(e) => setNewGateway({ ...newGateway, gatewayID: e.target.value })}
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <FormControl fullWidth sx={{ marginBottom: '15px' }}>
            <InputLabel>Frequency Band</InputLabel>
            <Select
              value={newGateway.frequencyBand}
              onChange={(e) => setNewGateway({ ...newGateway, frequencyBand: e.target.value })}
              label="Frequency Band"
            >
              {frequencyBands.map((band, index) => (
                <MenuItem key={index} value={band}>
                  {band}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Network Server"
            variant="outlined"
            value={newGateway.networkServer}
            onChange={(e) => setNewGateway({ ...newGateway, networkServer: e.target.value })}
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            label="Associated Site"
            variant="outlined"
            value={newGateway.associatedSite}
            onChange={(e) => setNewGateway({ ...newGateway, associatedSite: e.target.value })}
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <FormControl fullWidth sx={{ marginBottom: '15px' }}>
            <InputLabel>Gateway Status</InputLabel>
            <Select
              value={newGateway.gatewayStatus}
              onChange={(e) => setNewGateway({ ...newGateway, gatewayStatus: e.target.value })}
              label="Gateway Status"
            >
              {gatewayStatuses.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Signal Strength"
            variant="outlined"
            value={newGateway.signalStrength}
            onChange={(e) => setNewGateway({ ...newGateway, signalStrength: e.target.value })}
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            label="Data Transfer Rate"
            variant="outlined"
            value={newGateway.dataTransferRate}
            onChange={(e) => setNewGateway({ ...newGateway, dataTransferRate: e.target.value })}
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddGateway}
            fullWidth
          >
            {newGateway.id ? 'Update Gateway' : 'Add Gateway'}
          </Button>
        </Box>
      </Drawer>
      
      {/* Gateway Logs */}
      <Box sx={{ marginTop: '30px' }}>
        <Typography variant="h6">Gateway Logs</Typography>
        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Timestamp</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Activity</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.activity}</TableCell>
                  <TableCell>{log.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default GatewayManagement;
