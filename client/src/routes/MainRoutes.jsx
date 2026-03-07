import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import App from "../App/App";
import Favorites from "../pages/Favorites/Favorites";
import PersonalVault from "../pages/PersonalVault/PersonalVault";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
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
        path: "personal-vault",
        element: <PersonalVault />,
      },
      {
        path: 'Login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ],
  },
]);

export default Mainrouter;
