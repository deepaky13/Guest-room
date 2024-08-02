import { Box } from "@mui/material";
import { createContext, useContext } from "react";
import Navbar from "../../components/Navbar";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import FetchApi from "../../utils/customFetch";
import Footer from "../../components/Footer";

export const loader = async () => {
  try {
    const { data } = await FetchApi.get("/house");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

const GuesstDashboardOutlet = () => {
  const houses = useLoaderData();
  return (
    <DashboardContext.Provider value={{ houses }}>
      <Box>
        <Navbar />
        <div>
          <Outlet context={{ houses }} />
        </div>
        <Footer/>
      </Box>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default GuesstDashboardOutlet;
