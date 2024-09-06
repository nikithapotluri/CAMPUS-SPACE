import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Lab from "./components/labs/Lab";
import Slot from "./components/slot/Slot";
import RoutingError from "./components/RoutingError";
import ModalPopup from './components/modalpopup/ModalPopup'; 
import Select from './components/select/Select';
import SeminarHall from './components/seminarHalls/SeminarHall'; 
import BookedSlotsPage from './components/bookedslots/bookedSlotsPage' 
import AllBookedSlots from './components/allbookedslots/AllBookedSlots'

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      errorElement:<RoutingError />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "labs",
          element: <Lab />,
        },
        {
          path: "seminarHalls",
          element: <SeminarHall />,
        },
        {
          path: "slot",
          element: <Slot />,
        },
        {
          path: "modalpopup",
          element: <ModalPopup />,
        },
        {
          path: "select",
          element: <Select />,
        },
        {
          path: "bookedslots",
          element: <BookedSlotsPage />,
        },
        {
          path: "allbookedslots",
          element: <AllBookedSlots />,
        }
      ],
    },
  ]);

  return (
    <div className="main">
      <RouterProvider router={browserRouter} />
    </div>
  );

}

export default App;