import React, { useEffect, useRef } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Card,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  DashboardCustomize as DashboardCustomizationIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const DashboardCustomization = () => {
  const drawerWidth = 240;
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy any existing chart instance before creating a new one
    }

    // Create new chart instance
    const chartInstance = new ChartJS(chartRef.current, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "User Growth",
            data: [10, 30, 50, 20, 60, 80],
            borderColor: "#3f51b5",
            backgroundColor: "rgba(63, 81, 181, 0.3)",
            tension: 0.4,
            pointBackgroundColor: "#3f51b5",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              stepSize: 20,
            },
            grid: {
              borderDash: [8, 4],
            },
          },
        },
      },
    });

    // Save chart instance reference
    chartInstanceRef.current = chartInstance;

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Cleanup on component unmount
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component is mounted

  const dashboardCards = [
    { title: "Total Users", value: "1,200", icon: <AccountCircle />, color: "#3f51b5" },
    { title: "Active Users", value: "850", icon: <NotificationsIcon />, color: "#f50057" },
    { title: "New Signups", value: "320", icon: <DashboardCustomizationIcon />, color: "#009688" },
    { title: "Revenue", value: "$12,000", icon: <BarChartIcon />, color: "#ff9800" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {[{ text: "Dashboard", icon: <DashboardCustomizationIcon /> }, { text: "Analytics", icon: <BarChartIcon /> }, { text: "Settings", icon: <SettingsIcon /> }].map((item) => (
            <ListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f4f6f8",
          minHeight: "100vh",
          padding: 3,
        }}
      >
        {/* Top AppBar */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Dashboard Cards */}
        <Toolbar />
        <Grid container spacing={3}>
          {dashboardCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  borderLeft: `5px solid ${card.color}`,
                }}
              >
                <Avatar sx={{ bgcolor: card.color, marginRight: 2 }}>{card.icon}</Avatar>
                <Box>
                  <Typography variant="h6">{card.value}</Typography>
                  <Typography color="textSecondary">{card.title}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Chart Section */}
        <Box mt={4}>
          <Typography variant="h6" mb={2}>
            User Growth
          </Typography>
          <Box sx={{ bgcolor: "#fff", borderRadius: 2, padding: 2 }}>
            {/* <canvas ref={chartRef} /> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardCustomization;
