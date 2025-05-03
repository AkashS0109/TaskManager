import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { USER } from "../../constant"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewDetails = () => {
    alert("View Details clicked");
    handleMenuClose();
  };


  const handleLogout = async () => {
    try {
      const response = await axios.get(`${USER}/logout`);
      if (response.status === 200) {
        alert("Logout successful!");
        localStorage.removeItem('authToken');

        handleMenuClose();
        navigate("/")

      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert("An error occurred while logging out.");
    }
  };


  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ paddingX: 30 }} >
          Task Tracker
        </Typography>

        <IconButton onClick={handleMenuOpen} color="inherit" sx={{ paddingX: 20 }} >
          {isMobile ? <MenuIcon /> : <Avatar alt="User" src="" />}
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleViewDetails}>
            <PersonIcon sx={{ mr: 1 }} /> View Details
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
