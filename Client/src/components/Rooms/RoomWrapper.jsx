import { Box, Card, styled, Typography } from "@mui/material";

export const Header = styled(Box)({
  textAlign: "center",
  margin: "40px 0",
});

export const RoomCard = styled(Card)({
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
  boxShadow:
    " rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "center",
  },
});
export const CardContentBox = styled(Box)({
  width: "400px",
  display: "grid",
  padding: "20px",
  "@media (max-width: 600px)": {
    width: "180px",
    fontSize: "16px",
    display: "flex",
    padding: 0,
    flexDirection: "column",
    alignItems: "start",
  },
});
export const PriceBox = styled(Box)({
  width: "300px",
  display: "grid",
  justifyContent: "space-between",

  padding: "20px",
  "@media (max-width: 600px)": {
    display: "flex",
    width: "170px",
    gap: 1,
    padding: 0,
    flexDirection: "column",
    alignItems: "center",
  },
});

export const RoomDetails = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  //   gap: "20px",
  paddingLeft: "20px",
  "@media (max-width: 600px)": {
    paddingLeft: "0",
    textAlign: "center",
    marginTop: "20px",
  },
});
export const ListTypography = styled(Typography)({
  fontSize: "16px",
  "@media (max-width: 600px)": {
    fontSize: "13px",
    paddingLeft: "0",
    textAlign: "center",
    marginTop: "10px",
  },
});
export const FunctionBox = styled(Box)({
  display: "flex",
  gap: 5,
  "@media (max-width: 600px)": {
    fontSize: "13px",
    paddingLeft: "0",
    textAlign: "center",
  },
});
