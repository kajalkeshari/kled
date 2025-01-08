import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";
import { Delete, Edit, CopyAll } from "@mui/icons-material";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ManageSensorDashboard = () => {
  const sensorData = [
    { timestamp: "10:00", value: 24 },
    { timestamp: "10:05", value: 25 },
    { timestamp: "10:10", value: 26 },
    { timestamp: "10:15", value: 24.5 },
    { timestamp: "10:20", value: 23 },
  ];

  const [chartBoxes, setChartBoxes] = useState([
    {
      id: 1,
      name: "Temperature Sensor",
      type: "line",
      data: sensorData,
      location: "Room 1",
      time: "10:00",
    },
  ]);

  const [layout, setLayout] = useState([
    { i: "1", x: 0, y: 0, w: 1, h: 2 },
  ]);

  const [loading, setLoading] = useState(false);

  const addChartBox = () => {
    const newBoxId = chartBoxes.length + 1;
    const newBox = {
      id: newBoxId,
      name: "New Sensor",
      type: "line",
      data: sensorData,
      location: "New Room",
      time: "10:00",
    };
    setChartBoxes([...chartBoxes, newBox]);
    setLayout([
      ...layout,
      { i: String(newBoxId), x: (chartBoxes.length % 3) * 2, y: Infinity, w: 1, h: 2 },
    ]);
  };

  const deleteChartBox = (id) => {
    setChartBoxes(chartBoxes.filter((box) => box.id !== id));
    setLayout(layout.filter((l) => l.i !== String(id)));
  };

  const editChartBox = (id, updatedName, updatedLocation) => {
    const updatedBoxes = chartBoxes.map((box) =>
      box.id === id ? { ...box, name: updatedName, location: updatedLocation } : box
    );
    setChartBoxes(updatedBoxes);
  };

  const copyChartBox = (id) => {
    const boxToCopy = chartBoxes.find((box) => box.id === id);
    if (boxToCopy) {
      const copiedBoxId = chartBoxes.length + 1;
      const copiedBox = { ...boxToCopy, id: copiedBoxId };
      setChartBoxes([...chartBoxes, copiedBox]);
      setLayout([
        ...layout,
        { i: String(copiedBoxId), x: (layout.length % 3) * 2, y: Infinity, w: 1, h: 2 },
      ]);
    }
  };

  const renderChart = (type, data) => {
    switch (type) {
      case "line":
        return (
          <LineChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h5" gutterBottom align="center" sx={{ marginBottom: "30px" }}>
        Sensor Data Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: "20px" }}
        onClick={addChartBox}
      >
        Add New Chart Box
      </Button>
      <GridLayout
        className="layout"
        layout={layout}
        cols={3}
        rowHeight={120}
        width={1200}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
      >
        {chartBoxes.map((box) => (
          <div key={box.id} data-grid={layout.find((l) => l.i === String(box.id))}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {box.name} - {box.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Time: {box.time}
                </Typography>
                <Box sx={{ marginTop: "10px" }}>
                  <ResponsiveContainer width="100%" height={200}>
                    {renderChart(box.type, box.data)}
                  </ResponsiveContainer>
                </Box>
                <Box sx={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                  <IconButton color="primary" onClick={() => editChartBox(box.id, "Edited Sensor", "Edited Room")}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => deleteChartBox(box.id)}>
                    <Delete />
                  </IconButton>
                  <IconButton color="default" onClick={() => copyChartBox(box.id)}>
                    <CopyAll />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </div>
        ))}
      </GridLayout>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ManageSensorDashboard;
