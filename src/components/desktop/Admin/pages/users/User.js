import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Snackbar,
  Drawer,
  TextField,
  Avatar,
} from '@mui/material';
import { AddCircle, Delete, Edit, CheckCircle, PersonAdd } from '@mui/icons-material';

const User = () => {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'Aarav Sharma', 
      email: 'aarav.sharma@example.com', 
      role: 'Viewer', 
      permissions: 'View Only', 
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg', 
      associatedSites: ['Site1', 'Site2'], 
      activityLogs: [] 
    },
    { 
      id: 2, 
      name: 'Isha Verma', 
      email: 'isha.verma@example.com', 
      role: 'Operator', 
      permissions: 'Edit Access', 
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
      associatedSites: ['Site2', 'Site3'], 
      activityLogs: [] 
    },
    { 
      id: 3, 
      name: 'Karthik Reddy', 
      email: 'karthik.reddy@example.com', 
      role: 'Admin', 
      permissions: 'Admin Access', 
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg', 
      associatedSites: ['Site1', 'Site3', 'Site4'], 
      activityLogs: [] 
    },
    { 
      id: 4, 
      name: 'Priya Patel', 
      email: 'priya.patel@example.com', 
      role: 'Viewer', 
      permissions: 'View Only', 
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg', 
      associatedSites: ['Site4'], 
      activityLogs: [] 
    },
    { 
      id: 5, 
      name: 'Rohit Kumar', 
      email: 'rohit.kumar@example.com', 
      role: 'Operator', 
      permissions: 'Edit Access', 
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg', 
      associatedSites: ['Site2', 'Site5'], 
      activityLogs: [] 
    },
  ]);
  

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userPermissions, setUserPermissions] = useState('');
  const [userAssociatedSites, setUserAssociatedSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);

  const handleDrawerOpen = (user = null) => {
    setSelectedUser(user);
    if (user) {
      setUserName(user.name);
      setUserEmail(user.email);
      setUserRole(user.role);
      setUserPermissions(user.permissions);
      setUserAssociatedSites(user.associatedSites);
      setAvatar(user.avatar);
    } else {
      setUserName('');
      setUserEmail('');
      setUserRole('');
      setUserPermissions('');
      setUserAssociatedSites([]);
      setAvatar('');
      setAvatarFile(null);
    }
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    setSelectedUser(null);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
        setAvatarFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveUser = () => {
    setLoading(true);
    setTimeout(() => {
      const activityLogEntry = {
        action: selectedUser ? 'User Updated' : 'User Added',
        timestamp: new Date().toLocaleString(),
        userName,
      };

      if (selectedUser) {
        // Edit user
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id
              ? { ...user, name: userName, email: userEmail, role: userRole, permissions: userPermissions, avatar, associatedSites: userAssociatedSites, activityLogs: [...user.activityLogs, activityLogEntry] }
              : user
          )
        );
        setSnackbarMessage('User updated successfully');
      } else {
        // Add new user
        setUsers([
          ...users,
          { id: users.length + 1, name: userName, email: userEmail, role: userRole, permissions: userPermissions, avatar, associatedSites: userAssociatedSites, activityLogs: [activityLogEntry] },
        ]);
        setSnackbarMessage('User added successfully');
      }
      setSnackbarOpen(true);
      setLoading(false);
      handleDrawerClose();
    }, 1500);
  };

  const handleDeleteUser = (userId) => {
    const deletedUser = users.find((user) => user.id === userId);
    const activityLogEntry = {
      action: 'User Deleted',
      timestamp: new Date().toLocaleString(),
      userName: deletedUser.name,
    };

    setUsers(users.filter((user) => user.id !== userId));
    setSnackbarMessage('User removed successfully');
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ margin: '30px' }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleDrawerOpen()}
        startIcon={<PersonAdd />}
        sx={{
          marginBottom: '20px',
          backgroundColor: '#4CAF50',
          '&:hover': {
            backgroundColor: '#388E3C',
          },
        }}
      >
        Add User
      </Button>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Sites</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Avatar alt={user.name} src={user.avatar} />
                    </Grid>
                    <Grid item>{user.name}</Grid>
                  </Grid>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.associatedSites}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.permissions}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDrawerOpen(user)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user.id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: snackbarMessage.includes('successfully') ? 'green' : 'red',
            color: '#fff',
          },
        }}
      />

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleDrawerClose}
        sx={{
          width: 350,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 350,
            padding: '20px',
            backgroundColor: '#f4f4f4',
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          {selectedUser ? 'Edit User' : 'Add User'}
        </Typography>
        <TextField
          label="User Name"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '15px' }}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '15px' }}
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <FormControl fullWidth sx={{ marginBottom: '15px' }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={userRole}
            label="Role"
            onChange={(e) => setUserRole(e.target.value)}
          >
            <MenuItem value="Viewer">Viewer</MenuItem>
            <MenuItem value="Operator">Operator</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: '15px' }}>
          <InputLabel>Permissions</InputLabel>
          <Select
            value={userPermissions}
            label="Permissions"
            onChange={(e) => setUserPermissions(e.target.value)}
          >
            <MenuItem value="View Only">View Only</MenuItem>
            <MenuItem value="Edit Access">Edit Access</MenuItem>
            <MenuItem value="Admin Access">Admin Access</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Associated Sites"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '15px' }}
          value={userAssociatedSites.join(', ')}
          onChange={(e) => setUserAssociatedSites(e.target.value.split(','))}
        />
        <input type="file" accept="image/*" onChange={handleAvatarUpload} />
        <Box sx={{ marginBottom: '15px', marginTop: '10px' }}>
          <Avatar alt="User Avatar" src={avatar} sx={{ width: 100, height: 100 }} />
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSaveUser}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CheckCircle />}
        >
          {selectedUser ? 'Save Changes' : 'Add User'}
        </Button>
      </Drawer>
    </Box>
  );
};

export default User;
