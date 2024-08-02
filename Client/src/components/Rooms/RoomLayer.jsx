import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  CardMedia,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { addDays, format } from "date-fns";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import star from "../../assets/images/star.png";
import img from "../../assets/images/unavailable.png";
import {
  CardContentBox,
  Header,
  ListTypography,
  PriceBox,
  RoomCard,
  RoomDetails,
} from "./RoomWrapper";

const RoomLayer = ({ houses, bookings, searchvalues }) => {
  console.log(searchvalues);

  const [updatedHouses, setUpdatedHouses] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (!houses || !bookings) return;

    const calculateAvailability = (roomId) => {
      const roomBookings = bookings.filter(
        (booking) => booking.roomId === roomId
      );

      if (roomBookings.length === 0) return { status: "Available", date: null };

      const now = new Date();
      const availability = roomBookings.every((booking) => {
        const bookingStartDate = new Date(booking.date);
        const bookingEndDate = addDays(
          bookingStartDate,
          parseInt(booking.daysCount)
        );
        return now > bookingEndDate;
      });

      return {
        status: availability ? "Available" : "Unavailable",
        date: availability
          ? null
          : addDays(
              new Date(roomBookings[roomBookings.length - 1].date),
              parseInt(roomBookings[roomBookings.length - 1].daysCount)
            ),
      };
    };

    const updatedRooms = houses.map((room) => {
      const { status, date } = calculateAvailability(room._id);
      return {
        ...room,
        availability: status,
        availableIn:
          status === "Unavailable" ? format(date, "yyyy-MM-dd") : "Available",
      };
    });

    if (filter === "Available") {
      setUpdatedHouses(
        updatedRooms.filter((room) => room.availability === "Available")
      );
    } else {
      setUpdatedHouses(updatedRooms);
    }
  }, [houses, bookings, filter]);

  const handleUnavailableClick = () => {
    toast.error("This room is currently unavailable for booking.");
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  if (!updatedHouses || updatedHouses.length === 0) {
    return (
      <Container>
        <Header>
          <img
            src={star}
            alt="star"
            style={{ marginBottom: 20, marginTop: 30 }}
          />
          <Typography variant="h4" sx={{ marginBottom: 3 }}>
            Rooms & Suites
          </Typography>
          <Typography variant="subtitle1">
            Welcome to our home rental service! Browse through our meticulously
            curated room options, each designed to provide you with a
            comfortable and memorable stay. Whether you are looking for a cozy
            nook or a spacious suite, we have something to suit every preference
            and budget.
          </Typography>
        </Header>
        <Box
          sx={{
            minHeight: { xs: "60vh", md: "100vh", lg: "100vh" },
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            "& img": {
              width: "90vw",
              maxWidth: "600px",
              display: "block",
              marginBottom: "2rem",
              marginTop: "-10rem",
            },
            "& h3": {
              marginBottom: "0.5rem",
            },
            "& p": {
              lineHeight: 1.5,
              marginTop: "0.5rem",
              marginBottom: "1rem",
              color: "text.secondary",
            },
            "& a": {
              color: "primary.main",
              textTransform: "capitalize",
            },
          }}
        >
          <img src={img} alt="not Found" />
          <Typography variant="h4">No Rooms are Uploaded yet !</Typography>
          <Typography variant="body1">Your Perfect Room Awaits!</Typography>
        </Box>{" "}
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 10, mb: 5 }}>
      <Header>
        <img
          src={star}
          alt="star"
          style={{ marginBottom: 20, marginTop: 10 }}
        />
        <Typography variant="h4">Rooms & Suites</Typography>
        <Typography variant="subtitle1">
          Welcome to our home rental service! Browse through our meticulously
          curated room options, each designed to provide you with a comfortable
          and memorable stay. Whether you are looking for a cozy nook or a
          spacious suite, we have something to suit every preference and budget.
        </Typography>
      </Header>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ ml: "20px", fontSize: "24px" }}>Rooms</Typography>
        <FormControl sx={{ minWidth: 250, mb: 3 }}>
          <InputLabel id="filter-label">Filter Rooms</InputLabel>
          <Select
            labelId="filter-label"
            id="filter"
            value={filter}
            label="Filter Rooms"
            onChange={handleFilterChange}
          >
            <MenuItem value="All">All Rooms</MenuItem>
            <MenuItem value="Available">Available Rooms</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4}>
        {updatedHouses.map((room) => (
          <Grid item xs={12} key={room._id}>
            <RoomCard>
              <CardMedia
                component="img"
                image={room.imageUrl}
                alt={room.roomName}
                sx={{ width: 300, height: 300, borderRadius: "20px" }}
              />
              <RoomDetails>
                <CardContentBox>
                  <Typography sx={{ fontSize: "25px" }}>
                    {room.roomName}
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: "0px" }}>
                    {room.roomDesc}
                  </Typography>
                  <ListTypography variant="body2">
                    Number of Beds: {room.numberOfBeds}
                  </ListTypography>
                  <ListTypography variant="body2">
                    Floor Size: {room.floorSize}
                  </ListTypography>
                  <ListTypography variant="body2">
                    Available In:{" "}
                    {room.availability === "Unavailable"
                      ? room.availableIn
                      : "Available"}
                  </ListTypography>
                  <ListTypography sx={{ fontSize: "16px" }}>
                    Maximum Booking Days: {room.maxBookingPeriod}
                  </ListTypography>
                  <ListTypography sx={{ fontSize: "16px" }}>
                    Amenities: {room.amenities}
                  </ListTypography>
                </CardContentBox>
                <PriceBox>
                  <Typography variant="body2">Prices start at:</Typography>
                  <Typography variant="h5">
                    ${room.rentamount} / per day
                  </Typography>
                  {room.availability === "Available" ? (
                    <Link
                      to={`/dashboard-guest/book-room/${room._id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          width: { xs: "140px", lg: "170px" },
                          background: "#d1b47b",
                          height: "60px",
                          borderRadius: 10,
                          "&:hover": {
                            background: "#bfa16d",
                          },
                        }}
                      >
                        Book Now
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="contained"
                      sx={{
                        width: { xs: "140px", lg: "170px" },
                        background: "#d1b47b",
                        height: "60px",
                        borderRadius: 10,
                        "&:hover": {
                          background: "#bfa16d",
                        },
                      }}
                      onClick={handleUnavailableClick}
                    >
                      Unavailable
                    </Button>
                  )}
                </PriceBox>
              </RoomDetails>
            </RoomCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RoomLayer;
