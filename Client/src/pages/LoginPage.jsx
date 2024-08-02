import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import { Form, Link, redirect } from "react-router-dom";
import loginImage from "../assets/images/Login.png";
import logo from "../assets/images/logo.jpg";
import FetchApi from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await FetchApi.post("/auth/login", data);
    const userEmail = data.email;
    const userDetails = await FetchApi.get(`/users/${userEmail}`);
    const userRole = userDetails.data?.user?.role;
    console.log(userRole);
    toast.success("Login Successful");
    return redirect(userRole == "owner" ? "/dashboard" : "/dashboard-guest");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/login");
  }
};

const LoginPage = () => {
  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia component="img" image={loginImage} alt="House" />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ padding: "20px" }}>
            <img
              src={logo}
              alt="logo"
              style={{ height: "60px", widht: "60px", marginLeft: "150px" }}
            />
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
              Welcome again!
            </Typography>
            <Form method="post">
              <TextField
                fullWidth
                label="Email Address"
                margin="normal"
                variant="outlined"
                name="email"
              />
              <TextField
                fullWidth
                label="Type Password Here"
                margin="normal"
                type="password"
                variant="outlined"
                name="password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  background: "#3A1F14",
                  "&:hover": { background: "#3A1F14" },
                }}
              >
                Sign in
              </Button>
              <Typography variant="body2" align="center">
                or
              </Typography>

              <Typography variant="body2" align="center">
                Don't have an account?{" "}
                <Button>
                  <Link to={"/register"}>Sign up</Link>
                </Button>
              </Typography>
            </Form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
