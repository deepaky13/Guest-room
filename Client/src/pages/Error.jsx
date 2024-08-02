import { Box, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import img from "../assets/images/notFound.jpg";

const Error = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
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
          marginTop: "-3rem",
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
      <Typography variant="h3">Ohh...Page Not Found</Typography>
      <Typography variant="body1">
        Page you are looking for is not there!!!
      </Typography>
      <MuiLink component={Link} to="/">
        Back Home
      </MuiLink>
    </Box>
  );
};

export default Error;
