import * as React from "react";
import { styled, useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline, Drawer, AppBar as MuiAppBar, Toolbar, IconButton, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import CellTowerIcon from "@mui/icons-material/CellTower";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import HomeIcon from "@mui/icons-material/Home";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import { GrGateway } from "react-icons/gr";
import { SiMqtt } from "react-icons/si";
import { BiSolidCustomize } from "react-icons/bi";
import { GoAlertFill } from "react-icons/go";
import { HiDatabase } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { GrLicense } from "react-icons/gr";
import ReportIcon from '@mui/icons-material/Assessment';
import MainRoute from "../../../mainRoute/MainRoute";
import Profile from "../../../mainRoute/Profile"




const drawerWidth = 230;
const bgcolor =  "#c0c0c0";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 0 : `-${drawerWidth}px`,
  })
);

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  bgcolor: bgcolor,
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

export default function AdminDashboard() {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" open={open} sx={{bgcolor: '#080476'}}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
  color="inherit"
  aria-label="open drawer"
  onClick={handleDrawerOpen}
  edge="start"
  sx={{ mr: 2, ...(open && { display: "none" }) }}
>
  <MenuIcon />
</IconButton>
<IconButton  color="inherit" onClick={handleDrawerClose} sx={{ ...(open ? {} : { display: "none" }) }}>
  {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
</IconButton>

              <Box >
              <Typography variant="body3" noWrap component="div">
                Hello,  
              </Typography>
              <Typography fontWeight={'600'} variant="h7" noWrap component="div">
            Welcome
              </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <IconButton color="inherit" onClick={toggleMode}>
                {mode === "dark" ? <Brightness7  sx={{fontSize: 19}}/> : <Brightness4  sx={{fontSize: 19}}/>}
              </IconButton> */}
              <Profile/>
            </Box>
          </Toolbar>

        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          
          open={open}
        >
           
           <DrawerHeader
  sx={{
    bgcolor: bgcolor,
    color: '#696969',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    p: 0,
  }}
>
  {/* Image on the left */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    }}
  >
    <Box sx={{ marginRight: 2 }}> {/* Adds space between image and text */}
      <img
        src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
        width={'50px'}
        height={'50px'}
        alt="User Icon"
      />
    </Box>
    {/* Text on the right */}
    <Box sx={{ textAlign: 'left' }}>
      <Typography variant="subtitle2" fontWeight="bold">
     KLED Iot Sensor
      </Typography>
      <Typography variant="caption" fontWeight="bold" color="#138808">
        Online
      </Typography>
    </Box>
  </Box>
</DrawerHeader>


          <Divider />
          <Box sx={{bgcolor: bgcolor, height: '100vh', color: '#696969', p: 2}}>
          <List>
            <Link to={"/"}>
              <ListItem disablePadding>
                <ListItemButton sx={{ gap: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <DashboardIcon sx={{ fontSize: 17, color: '#696969' }}/>
                  </ListItemIcon>
                  <ListItemText      sx={{ my: 0 }}
             
                primaryTypographyProps={{
                  fontSize: 15,
                  color: '#696969',
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }} primary="Dashboard" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to={"/manage_sensor"}>
            <Box>
              <ListItem key="Sensor" disablePadding>
                <ListItemButton sx={{ gap: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CellTowerIcon sx={{ fontSize: 17, color: '#696969' }}/>
                  </ListItemIcon>
                  <ListItemText sx={{ my: 0 }}
             
             primaryTypographyProps={{
               fontSize: 15,
               color: '#696969',
               fontWeight: 'medium',
               letterSpacing: 0,
             }} primary="Sensor" />
                </ListItemButton>
              </ListItem>
            </Box>
          </Link>

          <Link to={"/manage_lorawan_gateway"}>
            <Box>
              <ListItem key="LoRaWAN Gateway" disablePadding>
                <ListItemButton sx={{ gap: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <GrGateway sx={{ fontSize: 17, color: '#696969' }}/>
                  </ListItemIcon>
                  <ListItemText sx={{ my: 0 }}
             
             primaryTypographyProps={{
               fontSize: 15,
               color: '#696969',
               fontWeight: 'medium',
               letterSpacing: 0,
             }} primary="LoRaWAN Gateway" />
                </ListItemButton>
              </ListItem>
            </Box>
          </Link>
          <Link to={"/manage_mqtt"}>
            <Box>
              <ListItem key="MQTT Broker" disablePadding>
                <ListItemButton sx={{ gap: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <SiMqtt sx={{ fontSize: 17 , color: '#696969'}}/>
                  </ListItemIcon>
                  <ListItemText sx={{ my: 0 }}
             
             primaryTypographyProps={{
               fontSize: 15,
               color: '#696969',
               fontWeight: 'medium',
               letterSpacing: 0,
             }} primary="MQTT Broker" />
                </ListItemButton>
              </ListItem>
            </Box>
          </Link>

          {/* <Link to={"/dashboard_customization"}>
          <Box>
          <ListItem key="Dashboard Customization " disablePadding>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <BiSolidCustomize sx={{ fontSize: 17 , color: '#696969'}} />
              </ListItemIcon>
              <ListItemText sx={{ my: 0 }}
             
             primaryTypographyProps={{
               fontSize: 15,
               color: '#696969',
               fontWeight: 'medium',
               letterSpacing: 0,
             }} primary="Dashboard Customization " />
            </ListItemButton>
          </ListItem>
          </Box>
          </Link> */}

          <Link to={"/manage_alerts"}>
          <Box>
          
          <ListItem key="Alerts " disablePadding>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <GoAlertFill sx={{ fontSize: 17, color: '#696969' }}/>
              </ListItemIcon>
              <ListItemText sx={{ my: 0 }}
             
             primaryTypographyProps={{
               fontSize: 15,
               color: '#696969',
               fontWeight: 'medium',
               letterSpacing: 0,
             }} primary="Alerts" />
            </ListItemButton>
          </ListItem>
          </Box>
          </Link>
          <Link to={"/manage_data"}>
          <Box>
          <ListItem key="Data Management" disablePadding>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <HiDatabase sx={{ fontSize: 17, color: '#696969' }}/>
              </ListItemIcon>
              <ListItemText sx={{ my: 0 }}
             
             primaryTypographyProps={{
               fontSize: 15,
               color: '#696969',
               fontWeight: 'medium',
               letterSpacing: 0,
             }} primary="Data Management" />
            </ListItemButton>
          </ListItem>
          </Box>
          </Link>

          <Link to={"/manage_users"}>
         <Box>
         <ListItem key="Users " disablePadding>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <FaUsers sx={{ fontSize: 17 , color: '#696969'}}/>
              </ListItemIcon>
              <ListItemText sx={{ my: 0 }}
             
             primaryTypographyProps={{
               fontSize: 15,
               color: '#696969',
               fontWeight: 'medium',
               letterSpacing: 0,
             }} primary="Users" />
            </ListItemButton>
          </ListItem>
         </Box>
         <Link to={"/manage_sites"}>
         <Box>
         <ListItem key="Sites" disablePadding>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <AddLocationAltIcon sx={{ fontSize: 17 , color: '#696969'}}/>
              </ListItemIcon>
              <ListItemText sx={{ my: 0 }}
             
             primaryTypographyProps={{
               fontSize: 15,
               color: '#696969',
               fontWeight: 'medium',
               letterSpacing: 0,
             }} primary="Sites" />
            </ListItemButton>
          </ListItem>
         </Box>
         </Link>
         </Link>
         <Link to={'/manage_license'}>
         <Box>
         <ListItem key="License Management" disablePadding>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <GrLicense sx={{ fontSize: 17 , color: '#696969'}}/>
              </ListItemIcon>
              <ListItemText sx={{ my: 0 }}
             
             primaryTypographyProps={{
               fontSize: 15,
               color: '#696969',
               fontWeight: 'medium',
               letterSpacing: 0,
             }} primary="License Management" />
            </ListItemButton>
          </ListItem>
         </Box>
         </Link>

         <Link to={"/manage_backup"}>
          <Box>
          <ListItem key="Backup & Restore" disablePadding>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <NewReleasesIcon sx={{ fontSize: 17, color: '#696969' }}/>
              </ListItemIcon>
              <ListItemText sx={{ my: 0 }}
             
             primaryTypographyProps={{
               fontSize: 15,
               color: '#696969',
               fontWeight: 'medium',
               letterSpacing: 0,
             }} primary="Backup & Restore" />
            </ListItemButton>
          </ListItem>
          </Box>
          </Link>
         <Link to={"/manage_reports"}>
         <Box>
         <ListItem key="Reports" disablePadding>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <ReportIcon sx={{ fontSize: 17 , color: '#696969'}}/>
              </ListItemIcon>
              <ListItemText sx={{ my: 0 }}
             
             primaryTypographyProps={{
               fontSize: 15,
               color: '#696969',
               fontWeight: 'medium',
               letterSpacing: 0,
             }} primary="Reports" />
            </ListItemButton>
          </ListItem>
         </Box>
         </Link>
         <Link to={"/manage_setting"}>
         <Box>
         <ListItem key="Settings" disablePadding>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <SettingsIcon sx={{ fontSize: 17 , color: '#696969'}}/>
              </ListItemIcon>
              <ListItemText sx={{ my: 0 }}
             
             primaryTypographyProps={{
               fontSize: 15,
               color: '#696969',
               fontWeight: 'medium',
               letterSpacing: 0,
             }} primary="Settings" />
            </ListItemButton>
          </ListItem>
         </Box>
         </Link>
         



          
          </List>
          </Box>
        </Drawer>
        <Main open={open} sx={{bgcolor: '#d3d3d3', height: '100%', color: '#696969', mt: 4}}>
          {/* <DrawerHeader /> */}
          <MainRoute  />

        </Main>
      </Box>
    </ThemeProvider>
  );
}
