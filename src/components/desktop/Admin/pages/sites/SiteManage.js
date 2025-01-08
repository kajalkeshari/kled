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
  IconButton,
  CircularProgress,
  Snackbar,
  Drawer,
  TextField,
} from '@mui/material';
import { AddCircle, Delete, Edit, CheckCircle, Report } from '@mui/icons-material';

const SiteManage = () => {
  const [sites, setSites] = useState([
    {
      id: 1,
      name: 'Head Office',
      latitude: '28.7041',
      longitude: '77.1025',
      address: 'Connaught Place, New Delhi, India',
      contactName: 'Rajesh Sharma',
      contactPhone: '9876543210',
      contactEmail: 'rajesh.sharma@example.com',
      gatewayId: 'GW12345',
      active: true,
    },
    {
      id: 2,
      name: 'Branch Office',
      latitude: '19.0760',
      longitude: '72.8777',
      address: 'Bandra Kurla Complex, Mumbai, India',
      contactName: 'Priya Kapoor',
      contactPhone: '9876543211',
      contactEmail: 'priya.kapoor@example.com',
      gatewayId: 'GW54321',
      active: false,
    },
  ]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);

  // Form Fields
  const [siteName, setSiteName] = useState('');
  const [siteLatitude, setSiteLatitude] = useState('');
  const [siteLongitude, setSiteLongitude] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [gatewayId, setGatewayId] = useState('');
  const [siteActive, setSiteActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleDrawerOpen = (site = null) => {
    setSelectedSite(site);
    if (site) {
      setSiteName(site.name);
      setSiteLatitude(site.latitude);
      setSiteLongitude(site.longitude);
      setSiteAddress(site.address);
      setContactName(site.contactName);
      setContactPhone(site.contactPhone);
      setContactEmail(site.contactEmail);
      setGatewayId(site.gatewayId);
      setSiteActive(site.active);
    } else {
      setSiteName('');
      setSiteLatitude('');
      setSiteLongitude('');
      setSiteAddress('');
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setGatewayId('');
      setSiteActive(true);
    }
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    setSelectedSite(null);
  };

  const handleSaveSite = () => {
    setLoading(true);
    setTimeout(() => {
      const siteData = {
        id: selectedSite ? selectedSite.id : sites.length + 1,
        name: siteName,
        latitude: siteLatitude,
        longitude: siteLongitude,
        address: siteAddress,
        contactName,
        contactPhone,
        contactEmail,
        gatewayId,
        active: siteActive,
      };
      if (selectedSite) {
        // Edit site
        setSites(sites.map((site) => (site.id === selectedSite.id ? siteData : site)));
        setSnackbarMessage('Site updated successfully');
      } else {
        // Add new site
        setSites([...sites, siteData]);
        setSnackbarMessage('Site added successfully');
      }
      setSnackbarOpen(true);
      setLoading(false);
      handleDrawerClose();
    }, 1500);
  };

  const handleDeleteSite = (siteId) => {
    setSites(sites.filter((site) => site.id !== siteId));
    setSnackbarMessage('Site removed successfully');
    setSnackbarOpen(true);
  };

  const generateReport = (siteId) => {
    alert(`Generating report for site with ID: ${siteId}`);
  };

  return (
    <Box sx={{ margin: '30px' }}>
      <Typography variant="h5" gutterBottom>
        Site Management
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
        Add Site
      </Button>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Site Name</TableCell>
              <TableCell>Location (Lat/Lng)</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Gateway ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map((site) => (
              <TableRow key={site.id}>
                <TableCell>{site.name}</TableCell>
                <TableCell>
                  {site.latitude}, {site.longitude}
                </TableCell>
                <TableCell>{site.address}</TableCell>
                <TableCell>
                  {site.contactName} <br />
                  {site.contactPhone} <br />
                  {site.contactEmail}
                </TableCell>
                <TableCell>{site.gatewayId}</TableCell>
                <TableCell>{site.active ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDrawerOpen(site)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteSite(site.id)} color="secondary">
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => generateReport(site.id)} color="default">
                    <Report />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar */}
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

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 400,
            padding: '20px',
            backgroundColor: '#f4f4f4',
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          {selectedSite ? 'Edit Site' : 'Add Site'}
        </Typography>
        <TextField
          label="Site Name"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '15px' }}
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
        />
        <TextField
          label="Latitude"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '15px' }}
          value={siteLatitude}
          onChange={(e) => setSiteLatitude(e.target.value)}
        />
        <TextField
          label="Longitude"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '15px' }}
          value={siteLongitude}
          onChange={(e) => setSiteLongitude(e.target.value)}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '15px' }}
          value={siteAddress}
          onChange={(e) => setSiteAddress(e.target.value)}
        />
        <TextField
          label="Contact Person Name"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '15px' }}
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
        />
        <TextField
          label="Contact Phone"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '15px' }}
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <TextField
          label="Contact Email"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '15px' }}
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
      

        <TextField
          label="Gateway ID"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '15px' }}
          value={gatewayId}
          onChange={(e) => setGatewayId(e.target.value)}
        />
        <FormControl fullWidth sx={{ marginBottom: '15px' }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={siteActive}
            onChange={(e) => setSiteActive(e.target.value)}
            label="Status"
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={handleDrawerClose}
            color="secondary"
            sx={{ marginRight: '10px' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveSite}
            variant="contained"
            color="primary"
            startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
            disabled={loading}
          >
            {selectedSite ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SiteManage;
