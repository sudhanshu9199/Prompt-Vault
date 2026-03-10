import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import App from "../App/App";
import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import("../pages/Home/Home"));
const Register = lazy(() => import("../pages/Auth/Register/Register"));
const Login = lazy(() => import("../pages/Auth/Login/Login"));
const PersonalVault = lazy(() => import("../pages/PersonalVault/PersonalVault"));
const Favorites = lazy(() => import("../pages/Favorites/Favorites"));

const Mainrouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      <Route element={<ProtectedRoute />}>
      {
        path: "favourites",
        element: <Favorites />,
      },
      {
        path: "personal-vault",
        element: <PersonalVault />,
      },
      </Route>
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
