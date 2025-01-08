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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { v4 as uuidv4 } from "uuid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CopyIcon from "@mui/icons-material/FileCopy";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AlarmIcon from "@mui/icons-material/Alarm";
import PieChartIcon from "@mui/icons-material/PieChart";
import { Add } from "@mui/icons-material";
import { AiOutlineAreaChart } from "react-icons/ai";
import ManageSensorDashboard from "./DasboardSEnsorCustomize";


const predefinedSensors = [
  { id: "sensor1", name: "Temperature Sensor" },
  { id: "sensor2", name: "Pressure Sensor" },
  { id: "sensor3", name: "Humidity Sensor" },
  { id: "sensor4", name: "Light Sensor" },
];

const DashboardCustomize = () => {
  const [sensors, setSensors] = useState([]);
  const [open, setOpen] = useState(false);
  const [sensorDetails, setSensorDetails] = useState({
    serialNumber: "",
    gateway: "",
    mqttTopic: "",
  });
  const [chartType, setChartType] = useState("pie");
  const [editingSensorId, setEditingSensorId] = useState(null);

  const handleChange = (e) => {
    setSensorDetails({ ...sensorDetails, [e.target.name]: e.target.value });
  };

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  const handleSave = () => {
    if (editingSensorId) {
      const updatedSensors = sensors.map((sensor) =>
        sensor.id === editingSensorId ? { ...sensorDetails, id: editingSensorId } : sensor
      );
      setSensors(updatedSensors);
    } else {
      const newSensor = { ...sensorDetails, id: uuidv4() };
      setSensors([...sensors, newSensor]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    const updatedSensors = sensors.filter((sensor) => sensor.id !== id);
    setSensors(updatedSensors);
  };

  const handleCopy = (sensor) => {
    const newSensor = { ...sensor, id: uuidv4() };
    setSensors([...sensors, newSensor]);
  };

  const handleOpen = (sensor = null) => {
    if (sensor) {
      setSensorDetails({ serialNumber: sensor.serialNumber, gateway: sensor.gateway, mqttTopic: sensor.mqttTopic });
      setEditingSensorId(sensor.id);
    } else {
      setSensorDetails({ serialNumber: "", gateway: "", mqttTopic: "" });
      setEditingSensorId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getChartData = () => [
    { time: "1", value: 12 },
    { time: "2", value: 19 },
    { time: "3", value: 3 },
    { time: "4", value: 5 },
    { time: "5", value: 2 },
    { time: "6", value: 3 },
  ];

  const getPieChartData = () => [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const getRealTimeValue = () => Math.random() * 100;

  const getClockTime = () => {
    const date = new Date();
    return date.toLocaleTimeString();
  };

  return (
    <Container maxWidth="lg" style={{ padding: '40px' }}>
      <Typography variant="h5" gutterBottom align="center" style={{ margin: "20px 0", fontWeight: 'bold' }}>
        Dashboard Customize
      </Typography>

      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
          style={{ backgroundColor: '#1976d2', fontSize: '16px' }}
          startIcon={<Add />}
        >
          Add Widget
        </Button>
      </Box>

      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <FormControl variant="outlined" style={{ width: 200 }}>
          <InputLabel>Chart Type</InputLabel>
          <Select value={chartType} onChange={handleChartTypeChange} label="Chart Type">
            <MenuItem value="line">
              <ShowChartIcon style={{ marginRight: '10px' }} />
              Line Chart
            </MenuItem>
            <MenuItem value="area">
              <AiOutlineAreaChart style={{ marginRight: '10px' }} />
              Area Chart
            </MenuItem>
            <MenuItem value="pie">
              <PieChartIcon style={{ marginRight: '10px' }} />
              Pie Chart
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 8, xs: 6, xxs: 4 }}
        rowHeight={150}
        width={1200}
      >
        {sensors.map((sensor) => (
          <Paper key={sensor.id} data-grid={{ x: 0, y: 0, w: 4, h: 4 }} style={{ borderRadius: 8, boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '16px', backgroundColor: '#f5f5f5' }}>
            <Box position="relative">
              <Box position="absolute" top={5} right={5} display="flex">
                <IconButton onClick={() => handleOpen(sensor)} size="small" color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(sensor.id)} size="small" color="secondary">
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => handleCopy(sensor)} size="small" color="primary">
                  <CopyIcon />
                </IconButton>
              </Box>

              <Typography variant="h6" style={{ fontWeight: '600' }}>
                {sensor.serialNumber}
              </Typography>
              <Typography textAlign={'center'} variant="body2">
                Temperature
              </Typography>

              {chartType === "line" && (
                <LineChart width={300} height={150} data={getChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              )}
              {chartType === "area" && (
                <AreaChart width={300} height={150} data={getChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              )}
              {chartType === "pie" && (
                <PieChart width={300} height={150}>
                  <Pie data={getPieChartData()} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label>
                    {getPieChartData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                    ))}
                  </Pie>
                </PieChart>
              )}

              <Box mt={2} display="flex" alignItems="center">
                <AccessTimeIcon fontSize="small" style={{ marginRight: '10px' }} />
                <Typography variant="body1">{getClockTime()}</Typography>
              </Box>

              <Box mt={2}>
                <Typography variant="body1">Real-Time Value: {getRealTimeValue().toFixed(2)}</Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </ResponsiveGridLayout>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add New Widget</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Sensor</InputLabel>
            <Select name="sensorId" value={sensorDetails.sensorId} onChange={handleChange}>
              {predefinedSensors.map((sensor) => (
                <MenuItem key={sensor.id} value={sensor.id}>
                  {sensor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Chart Type</InputLabel>
            <Select name="chartType" value={sensorDetails.chartType} onChange={handleChange}>
              <MenuItem value="line">
                <ShowChartIcon style={{ marginRight: "10px" }} />
                Line Chart
              </MenuItem>
              <MenuItem value="area">
                <AiOutlineAreaChart style={{ marginRight: "10px" }} />
                Area Chart
              </MenuItem>
              <MenuItem value="pie">
                <PieChartIcon style={{ marginRight: "10px" }} />
                Pie Chart
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Unit"
            name="unit"
            fullWidth
            value={sensorDetails.unit}
            onChange={handleChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

<ManageSensorDashboard/>

    </Container>
  );
};

export default DashboardCustomize;



