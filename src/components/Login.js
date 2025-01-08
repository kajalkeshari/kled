import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff,AccountCircle } from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import IoTImage from "../assets/image.png"; // Add a relevant image file to your project

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with credentials: ", credentials);
    // Add your login logic here
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#121212",
        padding: 2,
      }}
    >
      <Box
        component="img"
        src={IoTImage}
        alt="IoT Sensor Management"
        sx={{ width: 300, height: 100, mb: 2 }}
      />
      <Box
        sx={{
          width: 400,
          p: 4,
          bgcolor: "#1e1e1e",
          color: "#e0e0e0",
          boxShadow: 10,
          borderRadius: 2,
          borderTop: "4px solid #90caf9",
        }}
      >
        <Typography variant="h5" textAlign="center" color="#90caf9" mb={2}>
          IoT Sensor Management
        </Typography>
        <Typography variant="subtitle1" textAlign="center" color="#b0bec5" mb={4}>
          Login to your account
        </Typography>
        <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              size="small"
              value={credentials.username}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "gray",
                  },
                },
              }}
              required
              InputLabelProps={{ style: { color: "#90caf9" } }}
              InputProps={{
                style: {
                  color: "#e0e0e0",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle sx={{ color: "#90caf9" }} />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Password"
              size="small"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={credentials.password}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "gray",
                  },
                },
              }}
              required
              InputProps={{
                style: {
                  color: "#e0e0e0",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#90caf9" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      sx={{ color: "#90caf9" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "#90caf9" } }}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#90caf9",
              color: "#121212",
              fontWeight: 700,
              mt: 2,
              "&:hover": { bgcolor: "#64b5f6" , fontWeight: 700, },
              
            }}
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" color="#b0bec5" textAlign="center" mt={3}>
          © 2024 KLED IoT Sensing Pvt. Ltd.
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
