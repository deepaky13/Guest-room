import { Box, styled, Typography } from "@mui/material";

export const CustomAppbar = styled(Box)({
  height: "60px",
  background: "white",
  position: "sticky",
  top: 0,
  "@media (max-width: 600px)": {},
});
export const CustomButton = styled(Typography)({
  color: "black",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  border: "none",
  fontSize: "18px",
  fontWeight: 500,
  textDecoration: "none solid rgb(104, 104, 104)",
  textAlign: "left",
  lineHeight: "20px",
  position: "relative",
  display: "inline-block",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: "-3px",
    width: "0%",
    height: "1px",
    backgroundColor: "black",
    transition: "width 0.3s ease-out",
  },
  "&:hover::before": {
    width: "100%",
  },
  "@media (max-width: 600px)": {},
});
export const NavLinkBox = styled(Typography)({
  display: "flex",
  justifyContent: "space-evenly",
  gap: "25px",
  alignItems: "center",
  fontFamily: "Satoshi, sans-serif",
  "@media (max-width: 600px)": {},
});

export const ContactButton = styled("a")({
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  //
  padding: "10px",
  textDecoration: "none",
  color: "black",
  position: "relative",
  "&:hover": {
    "& > :nth-child(2)": {
      backgroundColor: "black",
      color: "white",
    },
    "&::after": {
      width: "100%",
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "0%",
    height: "2px",
    backgroundColor: "black",
    transition: "width 0.3s ease-out",
  },
  "@media (max-width: 600px)": {},
});
