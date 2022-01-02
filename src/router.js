import {createBrowserRouter} from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import HomeLayout from "./layouts/HomeLayout";
import AdminLayout from "./layouts/AdminLayout";
import Categories from "./pages/admin/Categories";
import Brands from "./pages/admin/Brands";
import Products from "./pages/admin/products/Products";
import CreateProduct from "./pages/admin/products/CreateProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout/>,
    },
    {
        path: "/admin",
        element: <AdminLayout/>,
        children: [
            {
                path: "/admin/categories",
                element: <Categories/>,
            }, {
                path: '/admin/brands',
                element: <Brands/>
            }, {
                path: '/admin/products',
                element: <Products/>,
            },
            {
                path: '/admin/products/create/:id',
                element: <CreateProduct/>
            }
            , {
                path: '/admin/products/create',
                element: <CreateProduct/>
            }
        ],
    },
    {
        path: "/login",
        element: <Login/>,
    },
]);

export default router;
