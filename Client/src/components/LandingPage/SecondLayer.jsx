import {
  Container,
  Typography,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import hotel1 from "../../assets/images/hotel1.jpg";
import { Link } from "react-router-dom";

const SecondLayer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
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
        <Box style={{ flex: 1, paddingRight: isSmallScreen ? "0" : "1rem" }}>
          <Box style={{ marginBottom: "1rem" }}>
            <img
              src={hotel1}
              alt="Hotel View"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Box>
        </Box>
        <Box style={{ flex: 1, paddingLeft: isSmallScreen ? "0" : "1rem" }}>
          <Typography variant="overline" display="block" gutterBottom>
            RAISING COMFORT TO THE HIGHEST LEVEL
          </Typography>
          <Typography variant="h4" gutterBottom>
            Welcome to Easy Rooms
          </Typography>
          <Typography variant="body1" gutterBottom>
            Welcome to our premier house rental and booking application, the
            ideal platform for guests seeking a combination of comfort,
            convenience, and affordability.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Our selection of homes is designed to meet diverse preferences,
            whether you're looking for a cozy apartment, a spacious family
            house, or a luxurious villa. Each property is equipped with modern
            amenities and is located in prime areas to ensure a pleasant stay.
          </Typography>
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
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
              Book Now
            </Button>
          </Link>
        </Box>
      </Container>
    </div>
  );
};

export default SecondLayer;
