import { Box, styled, Typography } from "@mui/material";

export const CustomAppbar = styled(Box)({
  height: "60px",
  width: "100%",
  "@media (max-width: 600px)": {},
  background: "white",
  position: "fixed",
  top: 0,
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
