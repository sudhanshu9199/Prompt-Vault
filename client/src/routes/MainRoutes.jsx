import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import App from "../App/App";
import Favorites from "../pages/Favorites/Favorites";
import PersonalVault from "../pages/PersonalVault/PersonalVault";
const Home = lazy(() => import("../pages/Home/Home"));

const Mainrouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "favourites",
        element: <Favorites />,
      },
      {
        path: 'personal-vault',
        element: <PersonalVault />
      },
    ],
  },
]);

export default Mainrouter;
