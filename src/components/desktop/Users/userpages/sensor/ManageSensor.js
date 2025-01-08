// import React, { useState } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CircularProgress,
//   Divider,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { Brightness4, Air, Thermostat, DeviceHub } from "@mui/icons-material"; // Icons

// const ManageSensor = () => {
//   // Dummy sensor data
//   const sensors = [
//     { id: 1, name: "Temperature Sensor", type: "Temperature", status: "Active", location: "Room 1", frequency: "1Hz", value: 24 },
//     { id: 2, name: "Humidity Sensor", type: "Humidity", status: "Active", location: "Room 2", frequency: "0.5Hz", value: 50 },
//     { id: 3, name: "CO2 Sensor", type: "CO2", status: "Inactive", location: "Room 3", frequency: "2Hz", value: 1.2 },
//   ];

//   // Dummy graph data
//   const dummySensorData = {
//     1: [
//       { timestamp: "10:00", value: 24 },
//       { timestamp: "10:05", value: 25 },
//       { timestamp: "10:10", value: 26 },
//       { timestamp: "10:15", value: 24.5 },
//       { timestamp: "10:20", value: 23 },
//     ],
//     2: [
//       { timestamp: "10:00", value: 45 },
//       { timestamp: "10:05", value: 50 },
//       { timestamp: "10:10", value: 55 },
//       { timestamp: "10:15", value: 53 },
//       { timestamp: "10:20", value: 52 },
//     ],
//     3: [
//       { timestamp: "10:00", value: 1.2 },
//       { timestamp: "10:05", value: 1.3 },
//       { timestamp: "10:10", value: 1.25 },
//       { timestamp: "10:15", value: 1.27 },
//       { timestamp: "10:20", value: 1.29 },
//     ],
//   };

//   const [selectedSensor, setSelectedSensor] = useState(null); // Selected sensor
//   const [sensorData, setSensorData] = useState([]); // Data of the selected sensor
//   const [loading, setLoading] = useState(false); // Simulating data loading

//   // Simulate data fetch for a specific sensor
//   const fetchSensorData = (sensorId) => {
//     setLoading(true);
//     setTimeout(() => {
//       setSensorData(dummySensorData[sensorId]);
//       setSelectedSensor(sensorId);
//       setLoading(false);
//     }, 1000); // Simulate 1-second delay
//   };

//   // Handle sensor delete action
//   const handleDelete = (sensorId) => {
//     // You can implement your logic here to delete the sensor
//     console.log(`Sensor with id ${sensorId} deleted.`);
//   };

//   return (
//     <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
//       <Typography variant="h5" gutterBottom align="center" sx={{ marginBottom: "30px" }}>
//         Sensor Monitoring Dashboard
//       </Typography>

//       {/* Sensor Table */}
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="sensor table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Sensor Name</TableCell>
//               <TableCell>Type</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Location</TableCell>
//               <TableCell>Frequency</TableCell>
//               <TableCell>Current Value</TableCell> {/* Added current value column */}
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {sensors.map((sensor) => (
//               <TableRow key={sensor.id}>
//                 <TableCell>{sensor.name}</TableCell>
//                 <TableCell>{sensor.type}</TableCell>
//                 <TableCell>
//                   <Typography color={sensor.status === "Active" ? "green" : "red"}>
//                     {sensor.status}
//                   </Typography>
//                 </TableCell>
//                 <TableCell>{sensor.location}</TableCell>
//                 <TableCell>{sensor.frequency}</TableCell>
//                 <TableCell>{sensor.value}</TableCell> {/* Display sensor value */}
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => fetchSensorData(sensor.id)}
//                     startIcon={<Brightness4 />}
//                   >
//                     View Data
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => handleDelete(sensor.id)}
//                     sx={{ marginLeft: "10px" }}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Loading State */}
//       {loading && (
//         <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
//           <CircularProgress />
//         </Box>
//       )}

//       {/* Sensor Data Graph */}
//       {selectedSensor && !loading && (
//         <Box sx={{ marginTop: "40px" }}>
//           <Divider sx={{ marginBottom: "20px" }} />
//           <Typography variant="h5" gutterBottom>
//             Data for Sensor: {sensors.find((s) => s.id === selectedSensor).name}
//           </Typography>
//           <ResponsiveContainer width="100%" height={400}>
//             <LineChart data={sensorData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="timestamp" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
//             </LineChart>
//           </ResponsiveContainer>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default ManageSensor;





import { Box } from '@mui/material'
import React from 'react'
import GetSensor from './GetSensor'

const ManageSensor = () => {
  return (
    <Box>
      <Box>
        <GetSensor/>
      </Box>
    </Box>
  )
}

export default ManageSensor