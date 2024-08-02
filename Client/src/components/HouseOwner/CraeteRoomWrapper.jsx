import { Box, styled, TextField } from "@mui/material";

export const WrapperContainer = styled(Box)({
  display: "flex",
  padding: 30,
  gap: "30px",
  "@media (max-width: 600px)": {
    display: "grid",
  },
});
export const WrapperInput = styled(Box)({
  maxWidth: 600,
  height: "650px",
  boxShadow:
    " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
  padding: 25,
  "@media (max-width: 600px)": {
    marginTop: 25,
    padding: 10,
    width: "350px",
    marginLeft: "-17px",
  },
});
export const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#ccc",
  },
});
