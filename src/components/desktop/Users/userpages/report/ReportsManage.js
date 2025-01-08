import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid,
} from "@mui/material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReportsManage = () => {
  const [sensors, setSensors] = useState([
    { id: "1", name: "Sensor A" },
    { id: "2", name: "Sensor B" },
    { id: "3", name: "Sensor C" },
  ]); // Mock Sensors
  const [selectedSensor, setSelectedSensor] = useState("");
  const [timeRange, setTimeRange] = useState({ start: "", end: "" });
  const [reportData, setReportData] = useState([]);
  const [savedReports, setSavedReports] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [reportName, setReportName] = useState("");

  // Load saved reports from local storage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedReports")) || [];
    setSavedReports(saved);
  }, []);

  // Save reports to local storage
  const saveReport = () => {
    const newReport = {
      name: reportName,
      sensor: selectedSensor,
      timeRange,
      data: reportData,
    };
    const updatedReports = [...savedReports, newReport];
    localStorage.setItem("savedReports", JSON.stringify(updatedReports));
    setSavedReports(updatedReports);
    alert("Report saved successfully!");
    setOpenDialog(false);
  };

  // Load a saved report
  const loadReport = (report) => {
    setSelectedSensor(report.sensor);
    setTimeRange(report.timeRange);
    setReportData(report.data);
  };

  // Generate mock report data
  const generateReport = () => {
    const mockData = [
      { timestamp: "2024-12-01 10:00", value: 25 },
      { timestamp: "2024-12-01 11:00", value: 30 },
      { timestamp: "2024-12-01 12:00", value: 35 },
    ]; // Replace with actual data
    setReportData(mockData);
  };

  // Export report to CSV
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "report.csv");
  };

  // Export report to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "report.xlsx");
  };

  // Export report to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Sensor Report", 14, 20);
    doc.autoTable({
      startY: 30,
      head: [["Timestamp", "Value"]],
      body: reportData.map((row) => [row.timestamp, row.value]),
    });
    doc.save("report.pdf");
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" mb={2} align="center" gutterBottom>
        Reports and Data Export
      </Typography>

      {/* Report Generation */}
      <Box display="flex" gap={3} marginBottom={2} flexWrap="wrap">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Sensor</InputLabel>
              <Select
                value={selectedSensor}
                onChange={(e) => setSelectedSensor(e.target.value)}
              >
                {sensors.map((sensor) => (
                  <MenuItem key={sensor.id} value={sensor.id}>
                    {sensor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              type="date"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              value={timeRange.start}
              onChange={(e) =>
                setTimeRange({ ...timeRange, start: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              type="date"
              label="End Date"
              InputLabelProps={{ shrink: true }}
              value={timeRange.end}
              onChange={(e) =>
                setTimeRange({ ...timeRange, end: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={generateReport}>
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Report Table */}
      {reportData.length > 0 && (
        <Paper sx={{ padding: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.timestamp}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Export Options */}
      {reportData.length > 0 && (
        <Box display="flex" gap={2} marginTop={3} flexWrap="wrap">
          <Button variant="contained" onClick={exportToCSV}>
            Export to CSV
          </Button>
          <Button variant="contained" onClick={exportToExcel}>
            Export to Excel
          </Button>
          <Button variant="contained" onClick={exportToPDF}>
            Export to PDF
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenDialog(true)}
          >
            Save Report
          </Button>
        </Box>
      )}

      {/* Saved Reports */}
      <Box marginTop={4}>
        <Typography variant="h6">Saved Reports</Typography>
        <Box display="flex" flexDirection="column" gap={1} marginTop={2}>
          {savedReports.map((report, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => loadReport(report)}
            >
              {report.name}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Save Report Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Save Report</DialogTitle>
        <DialogContent>
          <TextField
            label="Report Name"
            fullWidth
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={saveReport} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ReportsManage;
