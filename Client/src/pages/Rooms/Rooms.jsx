import { Box, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import FetchApi from "../../utils/customFetch";
import RoomLayer from "../../components/Rooms/RoomLayer";
import Navbar from "../../components/Navbar";

export const loader = async ({ request }) => {
  console.log(request.url);

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params);

  try {
    const houseResponse = await FetchApi.get("/house");
    const bookingResponse = await FetchApi.get("/booking", { params });

    // Ensure `bookings` is an array
    const bookings = Array.isArray(bookingResponse.data.bookings)
      ? bookingResponse.data.bookings
      : [];

    console.log(bookings);

    const houses = houseResponse.data.result
      ? houseResponse.data.result.flatMap((result) => result.houses)
      : [];

    return { houses, bookings, searchvalues: { ...params } };
  } catch (error) {
    toast.error(error.message || "Error fetching data");
    return { houses: [], bookings: [] };
  }
};

const RoomCard = () => {
  const { houses, bookings, searchvalues } = useLoaderData();

  if (!houses || houses.length === 0) {
    return <Typography variant="h6">No houses available</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <Navbar />
      <RoomLayer
        houses={houses}
        bookings={bookings}
        searchvalues={searchvalues}
      />
    </Box>
  );
};

export default RoomCard;
