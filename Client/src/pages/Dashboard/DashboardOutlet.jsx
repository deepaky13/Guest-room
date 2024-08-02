import { createContext, useContext } from "react";
import { Outlet, useLoaderData, redirect } from "react-router-dom";
import Footer from "../../components/Footer";
import { Box } from "@mui/material";
import FetchApi from "../../utils/customFetch";
import OwnerNavbar from "../../components/HouseOwner/OwnerNavbar";

export const loader = async () => {
  try {
    const { data } = await FetchApi.get("/users/current-user");
    console.log(data);
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const OwnerDashboardContext = createContext();

const DashBoard = () => {
  const { user } = useLoaderData();
  return (
    <OwnerDashboardContext.Provider value={{ user }}>
      <Box>
        <OwnerNavbar />
        <div>
          <Outlet />
        </div>
        <Footer />
      </Box>
    </OwnerDashboardContext.Provider>
  );
};

export const useOwnerDashboardContext = () => useContext(OwnerDashboardContext);
export default DashBoard;
