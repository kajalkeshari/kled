import React, { useState, useEffect } from "react";
import { GridLayout, Responsive, WidthProvider } from "react-grid-layout";
import { Paper, Typography, Box, Divider, Button } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { v4 as uuidv4 } from "uuid";
import { ResizableBox } from "react-resizable";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// Dummy Data for Line Graph (Temperature and Humidity)
const data = [
  { name: "12:00", temp: 22, humidity: 60 },
  { name: "12:15", temp: 23, humidity: 62 },
  { name: "12:30", temp: 24, humidity: 64 },
  { name: "12:45", temp: 25, humidity: 66 },
];

// Widget Components
const WidgetTypes = {
  LINE_GRAPH: "lineGraph",
  REAL_TIME: "realTime",
  THRESHOLD: "threshold",
  CLOCK: "clock",
};

const DraggableWidget = ({ widget, index }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Paper sx={{ padding: 2, borderRadius: 2 }}>
        <Typography variant="h6">{widget.title}</Typography>
        <Divider sx={{ margin: "8px 0" }} />
        {widget.component === WidgetTypes.LINE_GRAPH && (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temp" stroke="#8884d8" />
              <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        )}

        {widget.component === WidgetTypes.REAL_TIME && (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body1">Real-Time Value:</Typography>
            <Typography variant="h5">22°C</Typography>
            <Typography variant="body2">Humidity: 60%</Typography>
          </Box>
        )}

        {widget.component === WidgetTypes.THRESHOLD && (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body1">Threshold: 75°C</Typography>
            <Box
              sx={{
                width: "100%",
                height: "10px",
                background: "lightgray",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            >
              <Box
                sx={{
                  width: "70%", // Adjust for threshold
                  height: "100%",
                  backgroundColor: "red",
                  borderRadius: "5px",
                }}
              />
            </Box>
          </Box>
        )}

        {widget.component === WidgetTypes.CLOCK && (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body1">Current Time:</Typography>
            <Typography variant="h6">{widget.time}</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

const CustomDashboard = () => {
  const [widgets, setWidgets] = useState([
    { id: uuidv4(), title: "Line Graph", component: WidgetTypes.LINE_GRAPH, x: 0, y: 0, w: 4, h: 4 },
    { id: uuidv4(), title: "Threshold Gauge", component: WidgetTypes.THRESHOLD, x: 4, y: 0, w: 3, h: 4 },
    { id: uuidv4(), title: "Real-Time Value", component: WidgetTypes.REAL_TIME, x: 0, y: 4, w: 3, h: 2 },
    { id: uuidv4(), title: "Clock", component: WidgetTypes.CLOCK, time: new Date().toLocaleString(), x: 3, y: 4, w: 3, h: 2 },
  ]);

  // Update clock time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setWidgets((prevWidgets) =>
        prevWidgets.map((widget) =>
          widget.component === WidgetTypes.CLOCK ? { ...widget, time: new Date().toLocaleString() } : widget
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Layout change handler
  const onLayoutChange = (layout) => {
    const updatedWidgets = widgets.map((widget) => {
      const layoutItem = layout.find((item) => item.i === widget.id);
      if (layoutItem) {
        return { ...widget, x: layoutItem.x, y: layoutItem.y, w: layoutItem.w, h: layoutItem.h };
      }
      return widget;
    });
    setWidgets(updatedWidgets);
  };

  // Add new widget
  const addWidget = () => {
    const newWidget = {
      id: uuidv4(),
      title: "New Widget",
      component: WidgetTypes.LINE_GRAPH,
      x: 0,
      y: 0,
      w: 3,
      h: 3,
    };
    setWidgets((prev) => [...prev, newWidget]);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Customizable Dashboard
      </Typography>

      {/* Responsive Grid Layout */}
      <Responsive
        className="layout"
        layouts={{
          lg: widgets.map((widget) => ({
            i: widget.id,
            x: widget.x,
            y: widget.y,
            w: widget.w,
            h: widget.h,
          })),
          sm: widgets.map((widget) => ({
            i: widget.id,
            x: widget.x,
            y: widget.y,
            w: widget.w,
            h: widget.h,
          })),
          xs: widgets.map((widget) => ({
            i: widget.id,
            x: widget.x,
            y: widget.y,
            w: widget.w,
            h: widget.h,
          })),
        }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
        rowHeight={30}
        width={1200}
        onLayoutChange={onLayoutChange}
        compactType={null}
      >
        {widgets.map((widget) => (
          <div key={widget.id}>
            <ResizableBox
              width={widget.w * 100}
              height={widget.h * 30}
              minConstraints={[100, 30]}
              maxConstraints={[500, 300]}
            >
              <DraggableWidget widget={widget} />
            </ResizableBox>
          </div>
        ))}
      </Responsive>

      {/* Add Widget Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={addWidget}
      >
        Add Widget
      </Button>
    </Box>
  );
};

export default CustomDashboard;
