import { Typography, Button, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import landingImg from "../../assets/images/landing1.jpg";
import SecondLayer from "../../components/LandingPage/SecondLayer";
import Footer from "../../components/Footer";
const LandingPage = () => {
  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url(${landingImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: { xs: 4, md: 16 },
          textAlign: "center",
          height: "450px",
        }}
      >
        <Container>
          <Typography variant="h3" gutterBottom sx={{ color: "white" }}>
            Find Your Perfect Home with Ease
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "white" }}>
            Discover the best house rental deals with our comprehensive
            platform. We offer a wide range of properties to suit your needs,
            Book your next stay with us and enjoy unparalleled comfort and
            convenience.
          </Typography>
          <Box mt={4} sx={{ display: "inline-flex", gap: 3 }}>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Button
                color="inherit"
                variant="outlined"
                sx={{ borderRadius: 5, border: "1px solid white" }}
              >
                sign in
              </Button>
            </Link>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "white",
                width: "50px",
              }}
            >
              <Button
                color="inherit"
                variant="outlined"
                sx={{ borderRadius: 5, border: "1px solid white" }}
              >
                Regitser
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      <SecondLayer />
      <Footer />
    </div>
  );
};

export default LandingPage;
