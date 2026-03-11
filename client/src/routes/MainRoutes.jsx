import { createBrowserRouter } from "react-router";
import { Component, lazy, Suspense } from "react";
import App from "../App/App";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound/NotFound";
import Guestroute from "./Guestroute";

const Home = lazy(() => import("../pages/Home/Home"));
const Register = lazy(() => import("../pages/Auth/Register/Register"));
const Login = lazy(() => import("../pages/Auth/Login/Login"));
const PersonalVault = lazy(() => import("../pages/PersonalVault/PersonalVault"));
const Favorites = lazy(() => import("../pages/Favorites/Favorites"));

const withSuspense = (component) => {
  <Suspense>
    <Component />
  </Suspense>
}

const Mainrouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: withSuspense(Home),
      },
      {
        element: <Guestroute />,
        children: [
          {
            path: 'login',
            element: withSuspense(Login),
          },
          {
            path: 'register',
            element: withSuspense(Register),
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'favorites',
            element: withSuspense(Favorites),
          },
          {
            path: 'personal-vault',
            element: withSuspense(PersonalVault),
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      }
    ],
  },
]);

export default Mainrouter;
