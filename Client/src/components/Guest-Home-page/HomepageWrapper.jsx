import { Box, styled } from "@mui/material";

import img2 from "../../assets/images/guestHome.jpg";

export const BookingWrapperMainBox = styled(Box)({
  display: "flex",
  padding: "8% 10%",
  "@media (max-width: 600px)": {
    paddingTop: "18%",
    flexDirection: "column",
  },
});

export const BgImageWrapper = styled(Box)({
  marginTop: "4%",
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${img2})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "250px",
  width: "100%",
  "@media (max-width: 600px)": {
    height: "150px",
  },
});

export const BgInnerBox = styled(Box)({
  position: "absolute",
  right: "2%",
  top: "25%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  justifyContent: "center",
  color: "white",
  "@media (max-width: 600px)": {
    right: "2%",
    top: "8%",
  },
});
