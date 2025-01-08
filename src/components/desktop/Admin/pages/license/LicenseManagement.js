import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Snackbar,
  Drawer,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { AddCircle, Edit, Delete, CheckCircle } from '@mui/icons-material';

const LicenseManagement = () => {
  const [licenses, setLicenses] = useState([
    {
      id: 1,
      name: 'License A',
      activationDate: '2023-01-01',
      expiryDate: '2024-01-01',
      status: 'Active',
      licenseType: 'Paid',  // License Type (Free Trial, Paid, Enterprise)
      devices: 5,  // Devices/Sensors Bound
    },
    {
      id: 2,
      name: 'License B',
      activationDate: '2023-05-15',
      expiryDate: '2024-05-15',
      status: 'Active',
      licenseType: 'Free Trial',
      devices: 2,
    },
    {
      id: 3,
      name: 'License C',
      activationDate: '2023-09-10',
      expiryDate: '2024-09-10',
      status: 'Expired',
      licenseType: 'Paid',
      devices: 10,
    },
  ]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [licenseName, setLicenseName] = useState('');
  const [activationDate, setActivationDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [status, setStatus] = useState('Active');
  const [licenseType, setLicenseType] = useState('Paid');
  const [devices, setDevices] = useState(1);  // Devices bound per license
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const currentDate = new Date();

  // Check for licenses nearing expiration
  useEffect(() => {
    licenses.forEach((license) => {
      const expiry = new Date(license.expiryDate);
      const timeDiff = expiry - currentDate;

      // If license is expiring in 30 days, show a notification
      if (timeDiff <= 30 * 24 * 60 * 60 * 1000 && timeDiff > 0) {
        setSnackbarMessage(`License "${license.name}" is expiring soon!`);
        setSnackbarOpen(true);
      }
    });
  }, [licenses]);

  const handleDrawerOpen = (license = null) => {
    setSelectedLicense(license);
    if (license) {
      setLicenseName(license.name);
      setActivationDate(license.activationDate);
      setExpiryDate(license.expiryDate);
      setStatus(license.status);
      setLicenseType(license.licenseType);
      setDevices(license.devices);
    } else {
      setLicenseName('');
      setActivationDate('');
      setExpiryDate('');
      setStatus('Active');
      setLicenseType('Paid');
      setDevices(1);
    }
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    setSelectedLicense(null);
  };

  const handleSaveLicense = () => {
    setLoading(true);
    setTimeout(() => {
      if (selectedLicense) {
        // Edit existing license
        setLicenses(
          licenses.map((license) =>
            license.id === selectedLicense.id
              ? { ...license, name: licenseName, activationDate, expiryDate, status, licenseType, devices }
              : license
          )
        );
        setSnackbarMessage('License updated successfully');
      } else {
        // Add new license
        setLicenses([ 
          ...licenses, 
          { 
            id: licenses.length + 1, 
            name: licenseName, 
            activationDate, 
            expiryDate, 
            status, 
            licenseType, 
            devices 
          }
        ]);
        setSnackbarMessage('License added successfully');
      }
      setSnackbarOpen(true);
      setLoading(false);
      handleDrawerClose();
    }, 1500);
  };

  const handleDeleteLicense = (licenseId) => {
    setLicenses(licenses.filter((license) => license.id !== licenseId));
    setSnackbarMessage('License deleted successfully');
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ margin: '30px' }}>
      <Typography variant="h5" gutterBottom>
        License Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleDrawerOpen()}
        startIcon={<AddCircle />}
        sx={{
          marginBottom: '20px',
          backgroundColor: '#4CAF50',
          '&:hover': {
            backgroundColor: '#388E3C',
          },
        }}
      >
        Add License
      </Button>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>License Name</TableCell>
              <TableCell>Activation Date</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Status</TableCell>
              {/* <TableCell>License Type</TableCell> */}
              <TableCell>Devices Bound</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {licenses.map((license) => (
              <TableRow key={license.id}>
                <TableCell>{license.name}</TableCell>
                <TableCell>{license.activationDate}</TableCell>
                <TableCell>{license.expiryDate}</TableCell>
                <TableCell>{license.status}</TableCell>
                {/* <TableCell>{license.licenseType}</TableCell> */}
                <TableCell>{license.devices}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDrawerOpen(license)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteLicense(license.id)} color="secondary">
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
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: snackbarMessage.includes('successfully') ? 'green' : 'red',
            color: '#fff',
          },
        }}
      />

      {/* Drawer for adding/editing license */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleDrawerClose}
        sx={{
          width: 350,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 350,
            padding: '20px',
            backgroundColor: '#f4f4f4',
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          {selectedLicense ? 'Edit License' : 'Add License'}
        </Typography>
        <TextField
          label="License Name"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '15px' }}
          value={licenseName}
          onChange={(e) => setLicenseName(e.target.value)}
        />
        <TextField
          label="Activation Date"
          type="date"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '15px' }}
          value={activationDate}
          onChange={(e) => setActivationDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Expiry Date"
          type="date"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '15px' }}
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth sx={{ marginBottom: '15px' }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Expired">Expired</MenuItem>
          </Select>
        </FormControl>
        {/* <FormControl fullWidth sx={{ marginBottom: '15px' }}>
          <InputLabel>License Type</InputLabel>
          <Select
            value={licenseType}
            onChange={(e) => setLicenseType(e.target.value)}
            label="License Type"
          >
            <MenuItem value="Free Trial">Free Trial</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Enterprise">Enterprise</MenuItem>
          </Select>
        </FormControl> */}
        <TextField
          label="Devices Bound"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '15px' }}
          type="number"
          value={devices}
          onChange={(e) => setDevices(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={handleDrawerClose}
            sx={{ marginRight: '10px' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveLicense}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={24} /> : <CheckCircle />}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default LicenseManagement;
