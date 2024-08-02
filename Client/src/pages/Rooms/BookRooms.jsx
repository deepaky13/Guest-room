import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  Box,
} from "@mui/material";
import { Form, redirect, useLoaderData, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";
import FetchApi from "../../utils/customFetch";
import leftImg from "../../assets/images/leftImg.avif";
import rightImg from "../../assets/images/rightImg.jpg";
import { Header } from "../../components/Rooms/RoomWrapper";

export const loader = async ({ params }) => {
  try {
    const { data } = await FetchApi.get(`/house/${params.id}`);
    return data.house;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard-guest");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    // Post booking data
    await FetchApi.post("/booking", data);
    toast.success("Booked successfully...");

    return redirect("/dashboard-guest/rooms");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

import star from "../../assets/images/star.png";

const BookRooms = () => {
  const house = useLoaderData();

  const RoomId = useParams();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [bookingData, setBookingData] = useState({
    guestName: "",
    date: "",
    guestCount: "",
    daysCount: "",
    roomId: RoomId.id,
    roomName: house.roomName,
    imageUrl: house.imageUrl,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const daysCount = parseInt(bookingData.daysCount, 10);
    const maxBookingPeriod = parseInt(house.maxBookingPeriod, 10);
    const minBookingPeriod = parseInt(house.minBookingPeriod, 10);

    if (minBookingPeriod > daysCount || maxBookingPeriod < daysCount) {
      toast.error(
        `Booking must be between ${minBookingPeriod} and ${maxBookingPeriod} days`
      );
      return;
    }

    try {
      // Post booking data
      await FetchApi.post("/booking", bookingData);
      toast.success("Booked successfully...");

      return redirect("/dashboard-guest/rooms");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 5 }}>
      <Header sx={{ marginBottom: 0, mt: 10 }}>
        <img
          src={star}
          alt="star"
          style={{ marginBottom: 20, marginTop: 10 }}
        />
        <Typography variant="h4" sx={{ mb: 3 }}>
          Renovating Rooms
        </Typography>
        <Typography variant="subtitle1">
          Welcome to our home rental service! Browse through our meticulously
          curated room options, each designed to provide you with a comfortable
          and memorable stay. Whether you are looking for a cozy nook or a
          spacious suite, we have something to suit every preference and budget.
        </Typography>
      </Header>
      <Box sx={{ display: "flex", gap: 5, mt: 7 }}>
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            border: "10px solid #d1b47b",
            height: "500px",
            width: "500px",
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
        <Grid
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            maxWidth: 450,
            margin: "auto",
            padding: 2,
            boxShadow:
              "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
          }}
          direction={isSmallScreen ? "column-reverse" : "row"}
        >
          <Grid item xs={12} md={6}>
            <Card style={{ padding: "20px", p: 5 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                Book Room
              </Typography>
              <Form method="post" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Guest Name"
                  name="guestName"
                  value={bookingData.guestName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Date"
                  name="date"
                  type="date"
                  value={bookingData.date}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Guest Count"
                  name="guestCount"
                  type="number"
                  value={bookingData.guestCount}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Days Count"
                  name="daysCount"
                  type="number"
                  value={bookingData.daysCount}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
                <TextField
                  name="roomId"
                  type="hidden"
                  value={bookingData.roomId}
                />
                <TextField
                  name="roomName"
                  type="hidden"
                  value={bookingData.roomName}
                />
                <TextField
                  name="imageUrl"
                  type="hidden"
                  value={bookingData.imageUrl}
                />
                <Button
                  type="submit"
                  fullWidth
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
              </Form>
            </Card>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            border: "10px solid #d1b47b",
            height: "500px",
            width: "500px",
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
            alt="rightImg"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default BookRooms;
