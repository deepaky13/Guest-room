import { Container, Box, Card, CardContent, Typography } from "@mui/material";
import { GrGroup } from "react-icons/gr";
import { GiHouse } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";

const CardData = [
  {
    id: 1,
    icon: <GrGroup style={{ fontSize: "50px", color: "#d1b47b" }} />,
    title: "3k+ Guests",
    body: "We have successfully hosted over 3,000 guests, providing them with memorable and comfortable stays. Join our growing community of satisfied guests today.",
  },
  {
    id: 2,
    icon: <GiHouse style={{ fontSize: "50px", color: "#d1b47b" }} />,
    title: "1k+ Guest Rooms",
    body: "Explore our diverse range of guest rooms. From cozy apartments to spacious villas, we have the perfect space to suit every preference and need.",
  },
  {
    id: 3,
    icon: <FaPeopleGroup style={{ fontSize: "50px", color: "#d1b47b" }} />,
    title: "500+ Owners",
    body: "Join our network of over 500 property owners who trust us to manage their rentals. List your property with us and reach thousands of potential guests.",
  },
];

const HomeLayerThree = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          mt: 10,
        }}
      >
        {CardData.map((card) => (
          <Card
            key={card.id}
            sx={{
              flex: "1 1 calc(100% - 16px)",
              maxWidth: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 4,
              mb: 2,
              boxShadow:
                "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
              "@media (min-width: 600px)": {
                flex: "1 1 calc(50% - 16px)",
              },
              "@media (min-width: 900px)": {
                flex: "1 1 calc(33.333% - 16px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
              {card.icon}
            </Box>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ color: "green" }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "black",
                  "&:hover": {
                    color: "#d1b47b",
                  },
                }}
              >
                {card.body}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default HomeLayerThree;
