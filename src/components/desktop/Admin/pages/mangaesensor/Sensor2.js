// Required Imports
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { Line } from "recharts";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { v4 as uuidv4 } from "uuid";

const Sensor = () => {
  const [sensors, setSensors] = useState([]); // List of sensors
  const [open, setOpen] = useState(false); // Modal open state
  const [sensorDetails, setSensorDetails] = useState({
    serialNumber: "",
    gateway: "",
    mqttTopic: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setSensorDetails({ ...sensorDetails, [e.target.name]: e.target.value });
  };

  // Add Sensor
  const handleSave = () => {
    const newSensor = { ...sensorDetails, id: uuidv4() };
    setSensors([...sensors, newSensor]);
    handleClose();
  };

  // Delete Sensor
  const handleDelete = (id) => {
    const updatedSensors = sensors.filter((sensor) => sensor.id !== id);
    setSensors(updatedSensors);
  };

  // Open Modal
  const handleOpen = () => {
    setSensorDetails({ serialNumber: "", gateway: "", mqttTopic: "" });
    setOpen(true);
  };

  // Close Modal
  const handleClose = () => {
    setOpen(false);
  };

  // Sample Chart Data
  const getChartData = () => ({
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "Sensor Data",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        style={{ margin: "20px 0" }}
      >
        Sensor Management
      </Typography>

      {/* Add Sensor Button */}
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Sensor
        </Button>
      </Box>

      <ResponsiveGridLayout
  className="layout"
  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
  cols={{ lg: 12, md: 10, sm: 8, xs: 6, xxs: 4 }}
  rowHeight={150}
  width={1200}
>
  {sensors.map((sensor) => (
    <Paper key={sensor.id} data-grid={{ x: 0, y: 0, w: 4, h: 2 }}>
      <Box p={2}>
        <Typography variant="h6">{sensor.serialNumber}</Typography>
        <Typography variant="body2">Gateway: {sensor.gateway}</Typography>
        <Typography variant="body2">MQTT Topic: {sensor.mqttTopic}</Typography>
        <Line data={getChartData()} options={{ maintainAspectRatio: false }} />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(sensor.id)}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Paper>
  ))}
</ResponsiveGridLayout>


      {/* Add Sensor Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Sensor</DialogTitle>
        <DialogContent>
          <TextField
            label="Serial Number"
            name="serialNumber"
            value={sensorDetails.serialNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="LoRaWAN Gateway"
            name="gateway"
            value={sensorDetails.gateway}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="MQTT Topic"
            name="mqttTopic"
            value={sensorDetails.mqttTopic}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Sensor;
