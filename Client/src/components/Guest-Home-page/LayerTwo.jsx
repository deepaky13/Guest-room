import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useDashboardContext } from "../../pages/Dashboard-guest/GuesstDashboardOutlet";
import { Link } from "react-router-dom";
import { IoBedOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const LayerTwo = () => {
  const { houses } = useDashboardContext();
  const houseData = houses?.result?.[0]?.houses;
  const properties = houseData?.slice(0, 3) || [];
  return (
    <Box>
      <Container sx={{ marginTop: 8, paddingBottom: 10 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ textAlign: "center", mb: 3 }}
        >
          Rooms For Rent
        </Typography>
        <Typography sx={{ textAlign: "center", mb: 5 }}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </Typography>
        <Grid container spacing={4}>
          {properties.map((property, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  boxShadow:
                    " rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                  height: "470px",
                  borderRadius: "20px",
                  width: "350px",
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={property.imageUrl}
                  alt={property.roomName}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {property.Name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "black", fontSize: "24px" }}
                  >
                    {property.roomName}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Typography
                    sx={{ display: "flex", gap: 2, placeItems: "center" }}
                  >
                    <IoBedOutline
                      style={{ fontSize: "30px", color: "d1b47b" }}
                    />
                    Beds count : {property.numberOfBeds}
                  </Typography>

                  <Typography
                    sx={{ display: "flex", gap: 2, placeItems: "center" }}
                  >
                    <GrGroup style={{ fontSize: "30px", color: "d1b47b" }} />
                    Guests : {property.numberOfBeds}
                  </Typography>
                </CardActions>
                <Button
                  variant="contained"
                  style={{
                    marginTop: "20px",
                    color: "white",
                    background: "white",
                    boxShadow: "none",
                  }}
                >
                  <Link
                    to="/dashboard-guest/rooms"
                    style={{
                      textDecoration: "none",
                      color: "#172137",
                      display: "flex",
                      placeItems: "center",
                      gap: 6,
                    }}
                  >
                    Book Now <ChevronRightIcon />
                  </Link>
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LayerTwo;
