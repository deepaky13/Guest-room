import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import landing1 from "../../assets/images/landing1.jpg";

const CreateRoomWallpaper = () => {
  return (
    <Card
      sx={{
        maxWidth: 445,
        height: "650px",
        padding: 2,
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
      }}
    >
      <CardMedia sx={{ height: 340, borderRadius: "10px" }} image={landing1} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          sx={{ textAlign: "center" }}
          component="div"
        >
          Add Your Room Details
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#222", lineHeight: 1.6 }}
          color="text.secondary"
        >
          Welcome, owners! Start by adding detailed information about your
          rooms. Ensure to include high-quality images, a comprehensive
          description, amenities provided, availability, and pricing. This will
          help potential guests get a clear understanding of what you offer and
          increase the chances of bookings.
        </Typography>
        <Typography sx={{ fontSize: "20px", color: "green" }}>
          Let's make your property stand out!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CreateRoomWallpaper;
