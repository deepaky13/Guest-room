import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { Link, redirect, useLoaderData } from "react-router-dom";
import star from "../../assets/images/star.png";
import { useOwnerDashboardContext } from "./DashboardOutlet";
import FetchApi from "../../utils/customFetch";
import { toast } from "react-toastify";
import {
  CardContentBox,
  FunctionBox,
  Header,
  ListTypography,
  PriceBox,
  RoomCard,
  RoomDetails,
} from "../../components/Rooms/RoomWrapper";
import img from "../../assets/images/unavailable.png";
export const loader = async () => {
  try {
    const { data } = await FetchApi.get("/house");
    const houses = data.result.flatMap((result) => result.houses);
    return { houses };
  } catch (error) {
    console.error("Error fetching houses:", error);
    return redirect("/");
  }
};

const OwnerRooms = () => {
  const user = useOwnerDashboardContext();
  const userData = user.user;
  const { houses } = useLoaderData();
  const userId = userData._id;

  const [userHouses, setUserHouses] = useState(
    houses.filter((house) => house.createdBy === userId)
  );

  const handleDelete = async (houseId) => {
    try {
      const response = await FetchApi.delete(`/house/${houseId}`);
      if (response.status === 200) {
        setUserHouses(userHouses.filter((house) => house._id !== houseId));
        toast.success("Room is deleted successfully");
      } else {
        console.error("Failed to delete house. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error deleting house:", error);
    }
  };

  if (!userHouses || userHouses.length === 0) {
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
          <Typography variant="body1">Share your space with ease</Typography>
          <Link
            to={"/dashboard/addrooms"}
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
              Add Rooms
            </Button>
          </Link>
        </Box>{" "}
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 5, mb: 5 }}>
      <Header>
        <img
          src={star}
          alt="star"
          style={{ marginBottom: 20, marginTop: 10 }}
        />
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Rooms & Suites
        </Typography>
        <Typography variant="subtitle1">
          Welcome to our home rental service! Browse through our meticulously
          curated room options, each designed to provide you with a comfortable
          and memorable stay. Whether you are looking for a cozy nook or a
          spacious suite, we have something to suit every preference and budget.
        </Typography>
      </Header>
      <Grid container spacing={4} sx={{ marginTop: 5 }}>
        {userHouses.map((room) => (
          <Grid item xs={12} key={room._id}>
            <RoomCard>
              <CardMedia
                component="img"
                image={room.imageUrl}
                alt={room.roomName}
                sx={{ width: 300, height: 300, borderRadius: "20px", p: 1.5 }}
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
                    Availability: {room.availability}
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

                  <Link
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {room.availability === "booked"
                      ? "Already Booked"
                      : "Ready for Book"}
                  </Link>
                  <FunctionBox>
                    <Link
                      to={`/dashboard/editRooms/${room._id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        borderRadius: 10,
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          background: "#d1b47b",
                          height: "40px",
                          width: "100px",
                          "&:hover": {
                            background: "#bfa16d",
                          },
                        }}
                      >
                        Edit
                      </Button>
                    </Link>

                    <Button
                      variant="contained"
                      sx={{
                        background: "#d1b47b",
                        height: "40px",
                        padding: 0,
                        width: "100px",
                        "&:hover": {
                          background: "#bfa16d",
                        },
                      }}
                      onClick={() => handleDelete(room._id)}
                    >
                      Delete
                    </Button>
                  </FunctionBox>
                </PriceBox>
              </RoomDetails>
            </RoomCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OwnerRooms;
