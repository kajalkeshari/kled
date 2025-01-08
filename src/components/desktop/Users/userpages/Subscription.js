import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Divider,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, CheckCircle as CheckIcon, Cancel as CancelIcon } from "@mui/icons-material";

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]); // List of subscriptions
  const [open, setOpen] = useState(false); // Modal state
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    sensorType: "",
    frequency: "",
    active: false,
  });
  const [editingSubscriptionId, setEditingSubscriptionId] = useState(null);

  // Handle input changes in subscription form
  const handleChange = (e) => {
    setSubscriptionDetails({ ...subscriptionDetails, [e.target.name]: e.target.value });
  };

  // Handle subscription activation/deactivation
  const handleCheckboxChange = (e) => {
    setSubscriptionDetails({ ...subscriptionDetails, active: e.target.checked });
  };

  // Open modal for adding/editing subscription
  const handleOpen = (subscription = null) => {
    if (subscription) {
      setSubscriptionDetails({
        sensorType: subscription.sensorType,
        frequency: subscription.frequency,
        active: subscription.active,
      });
      setEditingSubscriptionId(subscription.id);
    } else {
      setSubscriptionDetails({ sensorType: "", frequency: "", active: false });
      setEditingSubscriptionId(null);
    }
    setOpen(true);
  };

  // Save new or edited subscription
  const handleSave = () => {
    if (editingSubscriptionId) {
      const updatedSubscriptions = subscriptions.map((sub) =>
        sub.id === editingSubscriptionId ? { ...subscriptionDetails, id: editingSubscriptionId } : sub
      );
      setSubscriptions(updatedSubscriptions);
    } else {
      const newSubscription = { ...subscriptionDetails, id: Date.now() };
      setSubscriptions([...subscriptions, newSubscription]);
    }
    handleClose();
  };

  // Delete subscription
  const handleDelete = (id) => {
    const updatedSubscriptions = subscriptions.filter((sub) => sub.id !== id);
    setSubscriptions(updatedSubscriptions);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center" style={{ margin: "20px 0" }}>
        Subscription Management
      </Typography>

      {/* Add Subscription Button */}
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
          startIcon={<AddIcon />}
        >
          Add Subscription
        </Button>
      </Box>

      {/* Subscription List */}
      <Box>
        {subscriptions.map((subscription) => (
          <Paper key={subscription.id} elevation={3} style={{ padding: 16, marginBottom: 16 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6">Sensor Type: {subscription.sensorType}</Typography>
                <Typography variant="body1">Frequency: {subscription.frequency}</Typography>
                <Typography variant="body2" color={subscription.active ? "green" : "red"}>
                  Status: {subscription.active ? "Active" : "Inactive"}
                </Typography>
              </Box>
              <Box>
                <IconButton
                  color="primary"
                  onClick={() => handleOpen(subscription)}
                  title="Edit Subscription"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(subscription.id)}
                  title="Delete Subscription"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
            <Divider style={{ margin: "10px 0" }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="textSecondary">
                <CheckIcon fontSize="small" style={{ color: subscription.active ? "green" : "red" }} />
                {subscription.active ? "Active" : "Inactive"}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Subscription Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editingSubscriptionId ? "Edit Subscription" : "Add Subscription"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Sensor Type"
            name="sensorType"
            value={subscriptionDetails.sensorType}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Frequency</InputLabel>
            <Select
              name="frequency"
              value={subscriptionDetails.frequency}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="1 minute">1 minute</MenuItem>
              <MenuItem value="5 minutes">5 minutes</MenuItem>
              <MenuItem value="10 minutes">10 minutes</MenuItem>
              <MenuItem value="30 minutes">30 minutes</MenuItem>
              <MenuItem value="1 hour">1 hour</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={subscriptionDetails.active}
                onChange={handleCheckboxChange}
                name="active"
                color="primary"
              />
            }
            label="Active Subscription"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" startIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" startIcon={<CheckIcon />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SubscriptionPage;
