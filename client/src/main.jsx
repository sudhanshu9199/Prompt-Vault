import { createRoot } from "react-dom/client";
import "./index.css";
import Mainrouter from "./routes/MainRoutes.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ThemeProvider>
      <RouterProvider router={Mainrouter} />
    </ThemeProvider>
  </AuthProvider>,
);
