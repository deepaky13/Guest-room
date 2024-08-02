import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Modal,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { CustomAppbar, CustomButton, NavLinkBox } from "./NavbarWrapper";
import logo from "../assets/images/logo.png";
import FetchApi from "../utils/customFetch";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = (open) => () => {
    setModalOpen(open);
  };

  const handleCloseAndNavigate = (to) => () => {
    setModalOpen(false);
    navigate(to);
  };

  const logoutUser = async () => {
    try {
      await FetchApi.get("/auth/logout");
      toast.success("Logout Successful");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  const modalContent = (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 350,
        height: 420,
        bgcolor: "background.paper",
        borderRadius: 5,
        boxShadow: 24,
        p: 3,
      }}
    >
      <List sx={{ border: "15px solid #D1B47B" }}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 5,
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ marginLeft: "0px", height: "60px" }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "black", fontSize: "28px" }}
          >
            Easy {"  "}
            Rooms
          </Typography>
        </Box>
        <Box sx={{ display: "grid", justifyContent: "center" }}>
          <ListItem
            sx={{ color: "black", mb: 2 }}
            onClick={handleCloseAndNavigate("/dashboard-guest")}
          >
            <Typography variant="body1" sx={{ fontSize: "24px" }}>
              Home
            </Typography>
          </ListItem>
          <ListItem
            sx={{ color: "black", mb: 2 }}
            onClick={handleCloseAndNavigate("/dashboard-guest/rooms")}
          >
            <Typography variant="body1" sx={{ fontSize: "20px" }}>
              Rooms
            </Typography>
          </ListItem>
          <ListItem
            sx={{ color: "black", mb: 2 }}
            onClick={handleCloseAndNavigate("/dashboard-guest/reserved")}
          >
            <Typography variant="body1" sx={{ fontSize: "20px" }}>
              Reserved
            </Typography>
          </ListItem>
          <ListItem onClick={logoutUser} sx={{ color: "black" }}>
            <Typography variant="body1" sx={{ fontSize: "20px" }}>
              Logout
            </Typography>
          </ListItem>
        </Box>
      </List>
    </Box>
  );

  return (
    <CustomAppbar>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ marginLeft: "0px", height: "40px" }}
          />
          <Typography variant="h6" component="div" sx={{ color: "black" }}>
            Easy {"  "}
            Rooms
          </Typography>
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            flexGrow: 0,
          }}
        >
          <NavLinkBox>
            <CustomButton component={Link} to="/dashboard-guest">
              Home
            </CustomButton>
            <CustomButton component={Link} to="/dashboard-guest/rooms">
              Rooms
            </CustomButton>
            <CustomButton component={Link} to="/dashboard-guest/reserved">
              Reserved
            </CustomButton>

            <CustomButton onClick={logoutUser}>Logout</CustomButton>
          </NavLinkBox>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleModal(true)}
          >
            <MenuIcon />
          </IconButton>
          <Modal
            open={modalOpen}
            onClose={toggleModal(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {modalContent}
          </Modal>
        </Box>
      </Toolbar>
    </CustomAppbar>
  );
};

export default Navbar;
