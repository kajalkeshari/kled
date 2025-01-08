import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Snackbar,
  CircularProgress,
  Drawer,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Backup, Restore, CloudDownload, CloudUpload } from '@mui/icons-material';

const BackupStore = () => {
  const [backupStatus, setBackupStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAutoBackup, setIsAutoBackup] = useState(false);
  const [backupInterval, setBackupInterval] = useState(24);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  // Simulate a backup process
  const handleBackup = () => {
    setLoading(true);
    setBackupStatus('Backing up...');
    setTimeout(() => {
      setBackupStatus('Backup completed successfully!');
      setSnackbarMessage('Backup completed successfully!');
      setSnackbarOpen(true);
      setLoading(false);
    }, 3000);
  };

  // Simulate a restore process
  const handleRestore = () => {
    setLoading(true);
    setBackupStatus('Restoring backup...');
    setTimeout(() => {
      setBackupStatus('Restore completed successfully!');
      setSnackbarMessage('Restore completed successfully!');
      setSnackbarOpen(true);
      setLoading(false);
    }, 3000);
  };

  // Show drawer to configure automatic backup settings
  const handleConfigureBackup = () => {
    setOpenDrawer(true);
  };

  // Close drawer
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Box sx={{ padding: '30px' }}>
      <Typography variant="h5" gutterBottom>
        Backup and Restore Management
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: '20px', boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              Backup
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Backup />}
              onClick={handleBackup}
              disabled={loading}
              sx={{ width: '100%' }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Perform Backup'
              )}
            </Button>
            <Typography variant="body1" sx={{ marginTop: '10px' }}>
              {backupStatus}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: '20px', boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              Restore Backup
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Restore />}
              onClick={handleRestore}
              disabled={loading}
              sx={{ width: '100%' }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Restore Backup'
              )}
            </Button>
            <Typography variant="body1" sx={{ marginTop: '10px' }}>
              {backupStatus}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: '30px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfigureBackup}
          startIcon={<CloudUpload />}
          sx={{ width: '100%' }}
        >
          Configure Automatic Backup
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
            backgroundColor: snackbarMessage.includes('completed') ? 'green' : 'red',
            color: '#fff',
          },
        }}
      />

      {/* Drawer for configuring backup settings */}
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
          Configure Automatic Backup
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={isAutoBackup}
              onChange={() => setIsAutoBackup(!isAutoBackup)}
              color="primary"
            />
          }
          label="Enable Automatic Backup"
        />
        {isAutoBackup && (
          <>
            <TextField
              label="Backup Interval (in hours)"
              type="number"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: '15px' }}
              value={backupInterval}
              onChange={(e) => setBackupInterval(e.target.value)}
            />
            <Typography variant="body2" sx={{ marginBottom: '15px' }}>
              Set the interval (in hours) at which backups should be performed automatically.
            </Typography>
          </>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={handleDrawerClose}
            color="secondary"
            sx={{ marginRight: '10px' }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDrawerClose();
              setSnackbarMessage('Automatic backup settings updated successfully');
              setSnackbarOpen(true);
            }}
            color="primary"
          >
            Save Settings
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default BackupStore;
