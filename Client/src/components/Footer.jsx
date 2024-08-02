import { Box, Typography } from "@mui/material";

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "60px",
          bgcolor: "#bd9442 ",
          color: "white",
          fontWeight: "Bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pr: "4%",
        }}
      >
        <Box>
          <Typography sx={{ "@media (max-width: 600px)": { mr: "-12px" } }}>
            Copyright <span style={{ color: "red" }}> © </span> Easy Rooms
            {year}. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
