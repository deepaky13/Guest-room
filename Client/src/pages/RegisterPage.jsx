import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Form, Link, redirect } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import registerImage from "../assets/images/register.jpeg";
import logo from "../assets/images/logo.jpg";
import { toast } from "react-toastify";
import FetchApi from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await FetchApi.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);

    return error;
  }
};

const RegisterPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
        direction={isSmallScreen ? "column-reverse" : "row"}
      >
        <Grid item xs={12} md={6}>
          <Card style={{ padding: "20px" }}>
            <img
              src={logo}
              alt="logo"
              style={{ height: "60px", width: "60px", marginLeft: "150px" }}
            />
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
              Welcome again!
            </Typography>
            <Form method="post">
              <TextField
                fullWidth
                label="User Name"
                variant="outlined"
                name="name"
                sx={{ marginBottom: 1 }}
              />
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                name="email"
                sx={{ marginBottom: 1 }}
              />
              <TextField
                fullWidth
                label="Type Password Here"
                type="password"
                variant="outlined"
                name="password"
                sx={{ marginBottom: 1 }}
              />
              <TextField
                fullWidth
                label="Mobile Number"
                type="text"
                variant="outlined"
                name="mobileNumber"
                sx={{ marginBottom: 1 }}
              />
              <FormControl fullWidth sx={{ marginBottom: 1 }}>
                <InputLabel id="role-label">Guest or Owner</InputLabel>
                <Select
                  labelId="role-label"
                  label="Guest or Owner"
                  variant="outlined"
                  name="role"
                >
                  <MenuItem value="guest">Guest</MenuItem>
                  <MenuItem value="owner">Owner</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  background: "#3A1F14",
                  marginTop: "16px",
                  "&:hover": { background: "#3A1F14" },
                }}
              >
                Sign up
              </Button>
              <Typography
                variant="body2"
                align="center"
                sx={{ marginTop: "16px" }}
              >
                or
              </Typography>

              <Typography
                variant="body2"
                align="center"
                sx={{ marginTop: "16px" }}
              >
                Already have an account?{" "}
                <Button>
                  <Link to="/login">Sign in</Link>
                </Button>
              </Typography>
            </Form>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={registerImage}
              sx={{ height: "620px" }}
              alt="House"
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterPage;
