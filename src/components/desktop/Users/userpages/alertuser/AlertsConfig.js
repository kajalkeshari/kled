import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, RadioGroup, FormControlLabel, Radio, Tabs, Tab, Grid, Paper, Alert, IconButton } from '@mui/material';
import { Notifications, Email, Sms, InvertColors,  ErrorOutline } from '@mui/icons-material';

const AlertsAndNotifications = () => {
  const [activeAlerts, setActiveAlerts] = useState([
    { id: 1, type: 'Temperature', message: 'Temperature too high: 35°C', status: 'Active' },
    { id: 2, type: 'Humidity', message: 'Humidity below threshold: 20%', status: 'Active' },
  ]);

  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
    inApp: true,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [alertAction, setAlertAction] = useState('');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleAlertAction = (action, alert) => {
    setAlertAction(action);
    setSelectedAlert(alert);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleUpdatePreferences = (e) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Alerts & Notifications
      </Typography>

      {/* Tabs for Active Alerts and Notification Preferences */}
      <Tabs value={tabValue} onChange={handleChangeTab} aria-label="alerts and notifications tabs">
        <Tab label="Active Alerts" />
        <Tab label="Notification Preferences" />
      </Tabs>

      {/* Active Alerts Tab */}
      {tabValue === 0 && (
        <Box sx={{ marginTop: 3 }}>
          <Grid container spacing={3}>
            {activeAlerts.map((alert) => (
              <Grid item xs={12} sm={6} md={4} key={alert.id}>
                <Paper elevation={3} sx={{ padding: 3 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                    <InvertColors sx={{ marginRight: 1 }} />
                    {alert.type} Alert
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    {alert.message}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2, color: 'gray' }}>
                    Status: {alert.status}
                  </Typography>
                  <Box sx={{ display: 'grid', gap: 1 }}>
                    <Button variant="outlined" onClick={() => handleAlertAction('Acknowledge', alert)} 
                    // startIcon={<Acknowledge />}
                    >
                      Acknowledge
                    </Button>
                    <Button variant="outlined" onClick={() => handleAlertAction('Escalate', alert)} startIcon={<ErrorOutline />} sx={{ marginLeft: 1 }}>
                      Escalate
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleAlertAction('Close', alert)} startIcon={<ErrorOutline />} sx={{ marginLeft: 1 }}>
                      Close
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Notification Preferences Tab */}
      {tabValue === 1 && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Customize Notification Preferences
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <FormControlLabel
              control={<Radio checked={notificationPreferences.email} onChange={handleUpdatePreferences} name="email" />}
              label="Email Notifications"
              icon={<Email />}
            />
            <FormControlLabel
              control={<Radio checked={notificationPreferences.sms} onChange={handleUpdatePreferences} name="sms" />}
              label="SMS Notifications"
              icon={<Sms />}
            />
            <FormControlLabel
              control={<Radio checked={notificationPreferences.inApp} onChange={handleUpdatePreferences} name="inApp" />}
              label="In-App Notifications"
              icon={<Notifications />}
            />
          </Box>
        </Box>
      )}

      {/* Alert Action Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{alertAction} Alert</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Are you sure you want to {alertAction} this alert?
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {selectedAlert?.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setActiveAlerts(activeAlerts.filter((alert) => alert.id !== selectedAlert.id));
              setOpenDialog(false);
            }}
            color="secondary"
          >
            {alertAction}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Confirmation */}
      <Alert severity="success" sx={{ marginTop: 3 }}>
        Your preferences have been updated successfully!
      </Alert>
    </Box>
  );
};

export default AlertsAndNotifications;
