import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { PersonAdd, RemoveCircleOutline } from "@mui/icons-material";

const SiteMapping = () => {
  const [sites, setSites] = useState([
    {
      id: 1,
      name: "Site 1",
      description: "Description of Site 1",
      sensors: [
        { id: 1, name: "Sensor A", assignedTo: [1, 2] },
        { id: 2, name: "Sensor B", assignedTo: [2] },
      ],
    },
    {
      id: 2,
      name: "Site 2",
      description: "Description of Site 2",
      sensors: [
        { id: 3, name: "Sensor C", assignedTo: [1] },
        { id: 4, name: "Sensor D", assignedTo: [] },
      ],
    },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedSensor, setSelectedSensor] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleOpen = (site) => {
    setSelectedSite(site);
    setSelectedUser("");
    setSelectedSensor("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAssignUser = () => {
    if (!selectedUser) {
      setAlertMessage("Please select a user to assign.");
      setAlertOpen(true);
      return;
    }

    const updatedSites = sites.map((site) =>
      site.id === selectedSite.id
        ? {
            ...site,
            sensors: site.sensors.map((sensor) =>
              sensor.id === selectedSensor
                ? { ...sensor, assignedTo: [...sensor.assignedTo, selectedUser] }
                : sensor
            ),
          }
        : site
    );
    setSites(updatedSites);
    setAlertMessage("User successfully assigned to sensor.");
    setAlertOpen(true);
    handleClose();
  };

  const handleRemoveUser = (siteId, sensorId, userId) => {
    const updatedSites = sites.map((site) =>
      site.id === siteId
        ? {
            ...site,
            sensors: site.sensors.map((sensor) =>
              sensor.id === sensorId
                ? {
                    ...sensor,
                    assignedTo: sensor.assignedTo.filter((id) => id !== userId),
                  }
                : sensor
            ),
          }
        : site
    );
    setSites(updatedSites);
    setAlertMessage("User removed from sensor.");
    setAlertOpen(true);
  };

  const handleSensorChange = (e) => {
    setSelectedSensor(e.target.value);
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center" style={{ margin: "20px 0" }}>
        Site Mapping with Sensors and Users
      </Typography>

      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAdd />}
          onClick={() => handleOpen(sites[0])}
        >
          Assign User to Sensor
        </Button>
      </Box>

      {/* Table for displaying Sites, Sensors, and Assigned Users */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Site</TableCell>
              <TableCell>Sensor</TableCell>
              <TableCell>Assigned Users</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map((site) =>
              site.sensors.map((sensor) => (
                <TableRow key={sensor.id}>
                  <TableCell>{site.name}</TableCell>
                  <TableCell>{sensor.name}</TableCell>
                  <TableCell>
                    {sensor.assignedTo.length > 0 ? (
                      sensor.assignedTo.map((userId) => {
                        const user = users.find((user) => user.id === userId);
                        return (
                          <div key={userId}>
                            {user.name}
                            <IconButton
                              edge="end"
                              color="error"
                              onClick={() => handleRemoveUser(site.id, sensor.id, userId)}
                            >
                              <RemoveCircleOutline />
                            </IconButton>
                          </div>
                        );
                      })
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No users assigned
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpen(site)}
                      size="small"
                    >
                      Assign User
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Assigning User to Sensor */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Assign User to {selectedSite?.name}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Sensor</InputLabel>
            <Select value={selectedSensor} onChange={handleSensorChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {selectedSite?.sensors.map((sensor) => (
                <MenuItem key={sensor.id} value={sensor.id}>
                  {sensor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>User</InputLabel>
            <Select value={selectedUser} onChange={handleUserChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAssignUser} color="primary">
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success or error message */}
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SiteMapping;
