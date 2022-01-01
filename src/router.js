import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import HomeLayout from "./layouts/HomeLayout";
import AdminLayout from "./layouts/AdminLayout";
import Categories from "./pages/admin/Categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/categories",
        element: <Categories />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
