import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Header } from "../../components/Rooms/RoomWrapper";
import star from "../../assets/images/star.png";
import { redirect, useLoaderData } from "react-router-dom";
import FetchApi from "../../utils/customFetch";
import { toast } from "react-toastify";
import img from "../../assets/images/unavailable.png";
import { Link } from "react-router-dom";

export const loader = async () => {
  try {
    const bookingResponse = await FetchApi.get("/booking/reserved");
    const bookings = bookingResponse.data.bookedRoom;
    console.log(bookings);

    return bookings;
  } catch (error) {
    return redirect("/");
  }
};

const Reserved = () => {
  const bookings = useLoaderData();
  console.log(bookings);

  const [bookingsState, setBookings] = useState(bookings);

  const handleDelete = async (id) => {
    try {
      await FetchApi.delete(`/booking/${id}`);
      toast.success("Bookings Deleted successfully");
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== id)
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error(error?.response?.data?.msg);
    }
  };

  const hasBookings = bookingsState && bookingsState.length > 0;

  if (!hasBookings) {
    return (
      <Container>
        <Header>
          <img
            src={star}
            alt="star"
            style={{ marginBottom: 20, marginTop: 30 }}
          />
          <Typography variant="h4" sx={{ marginBottom: 3 }}>
            Your Favourites
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
          <Typography variant="h4">No pages are reserved yet !</Typography>
          <Typography variant="body1">
            Are you looking for perfect rooms
          </Typography>
          <Link
            to={"/dashboard-guest/rooms"}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: { xs: "120px", lg: "150px" },
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
        </Box>{" "}
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 10, mb: 2 }}>
      <Header>
        <img
          src={star}
          alt="star"
          style={{ marginBottom: 20, marginTop: 10 }}
        />
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Your Favourites
        </Typography>
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
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          mt: 6,
          mb: 9,
        }}
      >
        {bookings.map((booking) => (
          <Card
            key={booking._id}
            sx={{
              flex: "1 1 calc(100% - 16px)",
              maxWidth: "400px",
              maxHeight: "500px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 4,
              mb: 2,
              boxShadow:
                "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
              "@media (min-width: 600px)": {
                flex: "1 1 calc(50% - 16px)",
              },
              "@media (min-width: 900px)": {
                flex: "1 1 calc(33.333% - 16px)",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image={booking.imageUrl}
                alt={booking.roomName}
                sx={{ objectFit: "cover", width: "100%", borderRadius: 1 }}
              />
            </Box>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                {booking.roomName}
              </Typography>

              <Grid
                container
                spacing={1}
                sx={{
                  mt: 1,
                  display: "grid",
                  rowGap: "10px",
                  justifyContent: "center",
                  width: "300px",
                }}
              >
                <Grid>
                  <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
                    Guest Name: {booking.guestName}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="body2" component="span" sx={{ ml: 0.7 }}>
                    Booked Date: {booking.date}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
                    Guests: {booking.guestCount} Members
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
                    Booked Days: {booking.daysCount} days
                  </Typography>
                </Grid>
              </Grid>

              <IconButton
                onClick={() => handleDelete(booking._id)}
                sx={{
                  mt: 1,
                  border: "1px solid #BD9442",
                  color: "#BD9442",
                  "&:hover": { background: "#BD9442", color: "white" },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Reserved;
