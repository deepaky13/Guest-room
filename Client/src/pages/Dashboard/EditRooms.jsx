import { useState } from "react";
import axios from "axios";
import { ROOM_STATUS } from "../../../../utils/constants.js";
import { toast } from "react-toastify";
import FetchApi from "../../utils/customFetch.js";
import { useLoaderData, redirect, useNavigate } from "react-router-dom";
import star from "../../assets/images/star.png";
import leftImg from "../../assets/images/leftImg.avif";
import rightImg from "../../assets/images/rightImg.jpg";
import { Header } from "../../components/Rooms/RoomWrapper.jsx";
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

export const loader = async ({ params }) => {
  try {
    const { data } = await FetchApi.get(`/house/${params.id}`);
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const UpdateHouseForm = () => {
  const { house } = useLoaderData();
  const [houseData, setHouseData] = useState({
    ownerName: house.ownerName || "",
    roomName: house.roomName || "",
    roomDesc: house.roomDesc || "",
    minBookingPeriod: house.minBookingPeriod || "",
    maxBookingPeriod: house.maxBookingPeriod || "",
    rentamount: house.rentamount || "",
    floorSize: house.floorSize || "",
    numberOfBeds: house.numberOfBeds || "",
    amenities: house.amenities || "",
    availability: house.availability || ROOM_STATUS.AVAILABLE,
  });

  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

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
  };

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
      await axios.patch(`/api/v1/houses/${house._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("House data updated successfully!");
      navigate("/dashboard/rooms");
    } catch (error) {
      toast.error("Error updating house data. Please try again.");
    }
  };

  return (
    <Container sx={{ mb: 10 }}>
      <Box>
        <Header sx={{ marginBottom: 10 }}>
          <img
            src={star}
            alt="star"
            style={{ marginBottom: 20, marginTop: 10 }}
          />
          <Typography variant="h4" sx={{ mb: 3 }}>
            Renovating Rooms ?
          </Typography>
          <Typography variant="subtitle1">
            Keeping your room fresh and updated not only attracts more guests
            but also ensures a higher satisfaction rate. Regular renovations and
            maintenance are key to providing a top-notch experience. Update your
            room details regularly to reflect the latest changes and
            enhancements.
          </Typography>
        </Header>
        <Box sx={{ display: "flex", gap: 5 }}>
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              border: "10px solid #d1b47b",
              height: "500px",
              width: "400px",
              boxShadow:
                "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
            }}
          >
            <img
              src={leftImg}
              style={{
                height: "100%",
                width: "100%",
                padding: 5,
              }}
              alt="leftImg"
            />
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              maxWidth: 450,
              margin: "auto",
              padding: 2,
              boxShadow:
                "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "center", mb: 5 }}
              gutterBottom
            >
              Update House Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Owner Name"
                  name="ownerName"
                  value={houseData.ownerName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Room Name"
                  name="roomName"
                  value={houseData.roomName}
                  onChange={handleChange}
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
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Minimum Booking Period"
                  name="minBookingPeriod"
                  value={houseData.minBookingPeriod}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Maximum Booking Period"
                  name="maxBookingPeriod"
                  value={houseData.maxBookingPeriod}
                  onChange={handleChange}
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
                  value={house.image}
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
                      background: "#bfa16d",
                    },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              border: "10px solid #d1b47b",
              height: "500px",
              width: "400px",
              boxShadow:
                "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
            }}
          >
            <img
              src={rightImg}
              style={{
                height: "100%",
                width: "100%",
                padding: 5,
              }}
              alt="rightImgu"
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateHouseForm;
