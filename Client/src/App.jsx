import { RouterProvider, createBrowserRouter } from "react-router-dom";

//---------------pages------------------------------
import Error from "./pages/Error";
import HomeLayout from "./pages/Home/HomeLayout";
import LandingPage from "./pages/Home/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/Dashboard/DashboardOutlet";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import Room from "./pages/Rooms/Rooms";
import GuesstDashboardOutlet from "./pages/Dashboard-guest/GuesstDashboardOutlet";
import GuestDashboard from "./pages/Dashboard-guest/GuestDashboard";
import BookRooms from "./pages/Rooms/BookRooms";
import Reserved from "./pages/Rooms/Reserved";
import HouseForm from "./pages/Dashboard/CreateHouseForm";
import OwnerRooms from "./pages/Dashboard/OwnerRooms";
import UpdateHouseForm from "./pages/Dashboard/EditRooms";

//-----------------loaders and action----------------------
import { action as registerAction } from "./pages/RegisterPage";
import { action as loginAction } from "./pages/LoginPage";
import { action as BookingAction } from "./pages/Rooms/BookRooms";
import { loader as RoomLoader } from "./pages/Rooms/Rooms";
import { loader as DashboardLoader } from "./pages/Dashboard-guest/GuesstDashboardOutlet";
import { loader as OwnerRoomLoader } from "./pages/Dashboard/OwnerRooms";
import { loader as OwnerDashboardLoader } from "./pages/Dashboard/DashboardOutlet";
import { loader as EditHouseLoader } from "./pages/Dashboard/EditRooms";
import { loader as ReservedLoader } from "./pages/Rooms/Reserved";
import { loader as BookingLoader } from "./pages/Rooms/BookRooms";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },

      {
        path: "dashboard-guest",
        element: <GuesstDashboardOutlet />,
        loader: DashboardLoader,
        children: [
          {
            index: true,
            element: <GuestDashboard />,
          },
          {
            path: "rooms",
            element: <Room />,
            loader: RoomLoader,
          },
          {
            path: "reserved",
            element: <Reserved />,
            loader: ReservedLoader,
          },
          {
            path: "book-room/:id",
            element: <BookRooms />,
            action: BookingAction,
            loader: BookingLoader,
          },
        ],
      },
      {
        path: "dashboard",
        element: <DashBoard />,
        loader: OwnerDashboardLoader,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "rooms",
            element: <OwnerRooms />,
            loader: OwnerRoomLoader,
          },
          {
            path: "addRooms",
            element: <HouseForm />,
          },
          {
            path: "editRooms/:id",
            element: <UpdateHouseForm />,
            loader: EditHouseLoader,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
