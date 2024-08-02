import { Box, Typography } from "@mui/material";
import guestHome from "../../assets/images/homepage1.avif";
import star from "../../assets/images/star.png";

function HomeLayerOne() {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${guestHome})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: { xs: "300px", sm: "400px", md: "500px" },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "black",
          textAlign: "center",
          padding: { xs: 2, sm: 3, md: 5 },
          position: "relative",
        }}
      >
        <Box
          sx={{
            marginTop: { xs: 5, sm: 7, md: 1 },
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <img
            src={star}
            alt="star"
            style={{
              marginBottom: 20,
              marginTop: 10,
              width: { xs: "40px", sm: "60px", md: "80px" },
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              mb: 2,
              color: "white",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
            }}
          >
            Share Your Space with Ease!
          </Typography>
          <Typography
            sx={{
              width: { xs: "90%", sm: "80%", md: "840px" },
              color: "white",
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
            }}
          >
            List and manage your guest rooms effortlessly. Reach potential
            guests with our easy-to-use platform and provide them with a
            memorable stay. Join us and enjoy seamless management and
            exceptional service.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default HomeLayerOne;
