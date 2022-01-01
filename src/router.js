import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import HomeLayout from "./layouts/HomeLayout";
import AdminLayout from "./layouts/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
