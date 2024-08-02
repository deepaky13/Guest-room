import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import star from "../../assets/images/star.png";
import { ROOM_STATUS } from "../../../../utils/constants.js";
import { Header } from "../../components/Rooms/RoomWrapper.jsx";
import CreateRoomWallapper from "../../components/HouseOwner/CreateRoomWallapper.jsx";
import {
  TextField,
  Button,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Input,
  Grid,
  Container,
} from "@mui/material";
import {
  WrapperContainer,
  WrapperInput,
} from "../../components/HouseOwner/CraeteRoomWrapper.jsx";

const HouseForm = () => {
  const [houseData, setHouseData] = useState({
    ownerName: "",
    roomName: "",
    roomDesc: "",
    minBookingPeriod: "",
    maxBookingPeriod: "",
    rentamount: "",
    floorSize: "",
    numberOfBeds: "",
    amenities: "",
    availability: ROOM_STATUS.AVAILABLE,
    imgUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setHouseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setHouseData((prevData) => ({
      ...prevData,
      imgUrl: file.name,
    }));
  };
  // for the switch process
  const handleAvailabilityChange = (event) => {
    setHouseData((prevData) => ({
      ...prevData,
      availability: event.target.checked
        ? ROOM_STATUS.AVAILABLE
        : ROOM_STATUS.UNAVAILABLE,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (const key in houseData) {
      formData.append(key, houseData[key]);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      //posting the house details
      await axios.post("/api/v1/houses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("House data submitted successfully!");
      // reseting all the values after the form submission
      setHouseData({
        ownerName: "",
        roomName: "",
        roomDesc: "",
        minBookingPeriod: "",
        maxBookingPeriod: "",
        rentamount: "",
        floorSize: "",
        numberOfBeds: "",
        amenities: "",
        availability: ROOM_STATUS.AVAILABLE,
        imgUrl: "",
      });
      setImageFile(null);
    } catch (error) {
      toast.error("Error submitting house data. Please try again.");
    }
  };

  return (
    <Container sx={{ mb: { xs: 34, sm: 10, lg: 5 } }}>
      <Header>
        <img src={star} alt="star" style={{ marginBottom: 20, marginTop: 0 }} />
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Ready to Add new rooms & suites?
        </Typography>
        <Typography variant="subtitle1">
          Fill out the details below to list your new property. Your exceptional
          offerings help us provide guests with unique and memorable stays.join
          us and enjoy seamless management and exceptional service
        </Typography>
      </Header>
      <WrapperContainer sx={{}}>
        <Box>
          <CreateRoomWallapper />
        </Box>
        <WrapperInput component="form" onSubmit={handleSubmit}>
          {" "}
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "center", mb: 5 }}
          >
            Enter House Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Owner Name"
                name="ownerName"
                value={houseData.ownerName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Room Name"
                name="roomName"
                value={houseData.roomName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Room Description"
                name="roomDesc"
                multiline
                rows={3}
                value={houseData.roomDesc}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Minimum Booking Period"
                name="minBookingPeriod"
                value={houseData.minBookingPeriod}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Maximum Booking Period"
                name="maxBookingPeriod"
                value={houseData.maxBookingPeriod}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rent Amount"
                name="rentamount"
                type="number"
                value={houseData.rentamount}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Floor Size"
                name="floorSize"
                value={houseData.floorSize}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Number of Beds"
                name="numberOfBeds"
                value={houseData.numberOfBeds}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amenities"
                name="amenities"
                value={houseData.amenities}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Input
                type="file"
                fullWidth
                onChange={handleImageChange}
                inputProps={{ accept: "image/*" }}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: "100px" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={houseData.availability === ROOM_STATUS.AVAILABLE}
                    onChange={handleAvailabilityChange}
                    name="availability"
                  />
                }
                label="Available"
              />
              <Button
                type="submit"
                sx={{
                  mt: 2,
                  border: "1px solid #bfa16d",
                  color: "white",
                  background: "#d1b47b",
                  "&:hover": {
                    background: "#d1b47b",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </WrapperInput>
      </WrapperContainer>
    </Container>
  );
};

export default HouseForm;
