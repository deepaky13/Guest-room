import {
  Container,
  Typography,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import hotel6 from "../../assets/images/hotel6.avif";
import { Link } from "react-router-dom";

const HomeLayerTwo = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div
      style={{ padding: "2rem", backgroundColor: "#f9f9f9", marginTop: "50px" }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 50,
          textAlign: isSmallScreen ? "center" : "left",
        }}
      >
        <Box style={{ flex: 1, paddingLeft: isSmallScreen ? "0" : "1rem" }}>
          <Typography variant="overline" display="block" gutterBottom>
            JOIN OUR NETWORK OF EXCEPTIONAL HOMES
          </Typography>
          <Typography variant="h4" gutterBottom>
            Unlock Your Property's Potential with Easy Rooms
          </Typography>
          <Typography variant="body1" gutterBottom>
            Join our premier house rental and booking platform, designed
            specifically for homeowners like you.
          </Typography>

          <Typography variant="body1" gutterBottom>
            Our platform offers you tools to manage bookings efficiently,
            connect with guests, and ensure your property stands out. Start
            registering your home today and become part of a network that values
            quality and excellence.
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#d1b47b",
              color: "white",
              borderRadius: "20px",
              padding: "0.5rem 2rem",
              marginTop: "1rem",
            }}
          >
            <Link
              to="/dashboard/addrooms"
              style={{ textDecoration: "none", color: "white" }}
            >
              Add Room
            </Link>
          </Button>
        </Box>
        <Box style={{ flex: 1, paddingRight: isSmallScreen ? "0" : "1rem" }}>
          <Box style={{ marginBottom: "1rem" }}>
            <img
              src={hotel6}
              alt="Hotel View"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default HomeLayerTwo;
