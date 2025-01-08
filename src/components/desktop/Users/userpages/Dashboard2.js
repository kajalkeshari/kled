// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Typography,
//   Button,
//   Box,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Paper,
// } from "@mui/material";
// import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
// import { v4 as uuidv4 } from "uuid";

// const Dashboard2 = () => {
//   const [widgets, setWidgets] = useState([]);
//   const [layout, setLayout] = useState([]);
//   const [openWidgetDialog, setOpenWidgetDialog] = useState(false);
//   const [widgetDetails, setWidgetDetails] = useState({
//     title: "",
//     type: "Graph",
//     sensor: "",
//   });
//   const [sensors, setSensors] = useState([
//     { id: "1", serialNumber: "Sensor A" },
//     { id: "2", serialNumber: "Sensor B" },
//     { id: "3", serialNumber: "Sensor C" },
//   ]); // Predefined sensors

//   // Load saved layout from local storage
//   useEffect(() => {
//     const savedLayout = JSON.parse(localStorage.getItem("dashboardLayout")) || [];
//     const savedWidgets = JSON.parse(localStorage.getItem("dashboardWidgets")) || [];
//     setLayout(savedLayout);
//     setWidgets(savedWidgets);
//   }, []);

//   // Save layout to local storage
//   const saveLayoutToStorage = () => {
//     localStorage.setItem("dashboardLayout", JSON.stringify(layout));
//     localStorage.setItem("dashboardWidgets", JSON.stringify(widgets));
//     alert("Dashboard layout saved!");
//   };

//   // Handle Widget Details Change
//   const handleWidgetChange = (e) => {
//     setWidgetDetails({ ...widgetDetails, [e.target.name]: e.target.value });
//   };

//   // Add New Widget
//   const handleAddWidget = () => {
//     const newWidget = {
//       id: uuidv4(),
//       title: widgetDetails.title,
//       type: widgetDetails.type,
//       sensor: widgetDetails.sensor,
//       dataGrid: { x: 0, y: Infinity, w: 4, h: 2 }, // Default grid position and size
//     };
//     setWidgets([...widgets, newWidget]);
//     setOpenWidgetDialog(false);
//   };

//   // Delete Widget
//   const handleDeleteWidget = (id) => {
//     setWidgets(widgets.filter((widget) => widget.id !== id));
//     setLayout(layout.filter((l) => l.i !== id));
//   };

//   return (
//     <Container maxWidth="lg">
//       <Typography
//         variant="h4"
//         gutterBottom
//         align="center"
//         style={{ margin: "20px 0" }}
//       >
//         Customizable Dashboard
//       </Typography>

//       <Box display="flex" justifyContent="space-between" marginBottom={2}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setOpenWidgetDialog(true)}
//         >
//           Add Widget
//         </Button>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={saveLayoutToStorage}
//         >
//           Save Layout
//         </Button>
//       </Box>

//       {/* Drag-and-Drop Grid Layout */}
//       <ResponsiveGridLayout
//         className="layout"
//         layouts={{ lg: layout }}
//         onLayoutChange={(currentLayout) => setLayout(currentLayout)}
//         breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//         cols={{ lg: 12, md: 10, sm: 8, xs: 6, xxs: 4 }}
//         rowHeight={150}
//         width={1200}
//       >
//         {widgets.map((widget) => (
//           <Paper
//             key={widget.id}
//             data-grid={widget.dataGrid}
//             style={{ padding: "16px", display: "flex", flexDirection: "column" }}
//           >
//             <Typography variant="h6">{widget.title}</Typography>
//             <Typography variant="body2">Type: {widget.type}</Typography>
//             <Typography variant="body2">
//               Sensor:{" "}
//               {sensors.find((sensor) => sensor.id === widget.sensor)?.serialNumber ||
//                 "None"}
//             </Typography>
//             <Box mt={2} display="flex" justifyContent="space-between">
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 size="small"
//                 onClick={() => handleDeleteWidget(widget.id)}
//               >
//                 Delete
//               </Button>
//             </Box>
//           </Paper>
//         ))}
//       </ResponsiveGridLayout>

//       {/* Add Widget Dialog */}
//       <Dialog
//         open={openWidgetDialog}
//         onClose={() => setOpenWidgetDialog(false)}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>Add Widget</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Widget Title"
//             name="title"
//             value={widgetDetails.title}
//             onChange={handleWidgetChange}
//             fullWidth
//             margin="normal"
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Widget Type</InputLabel>
//             <Select
//               name="type"
//               value={widgetDetails.type}
//               onChange={handleWidgetChange}
//             >
//               <MenuItem value="Graph">Graph</MenuItem>
//               <MenuItem value="Table">Data Table</MenuItem>
//               <MenuItem value="Gauge">Gauge</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Assign Sensor</InputLabel>
//             <Select
//               name="sensor"
//               value={widgetDetails.sensor}
//               onChange={handleWidgetChange}
//             >
//               <MenuItem value="">None</MenuItem>
//               {sensors.map((sensor) => (
//                 <MenuItem key={sensor.id} value={sensor.id}>
//                   {sensor.serialNumber}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenWidgetDialog(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleAddWidget}
//             variant="contained"
//             color="primary"
//           >
//             Add Widget
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default Dashboard2;
