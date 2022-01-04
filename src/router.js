import {createBrowserRouter} from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import HomeLayout from "./layouts/HomeLayout";
import AdminLayout from "./layouts/AdminLayout";
import Categories from "./pages/admin/Categories";
import Brands from "./pages/admin/Brands";
import Products from "./pages/admin/products/Products";
import CreateProduct from "./pages/admin/products/CreateProduct";
import {default as ClientProducts} from './pages/Products'
import Product from "./pages/Product";
import Dashboard from "./pages/user/Dashboard";

const router = createBrowserRouter([
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
                path: '/admin/products/create/:slug',
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
    {
        path: "/",
        element: <HomeLayout/>,
        children: [
            {
                path: '/product/:slug',
                element: <Product/>
            },
            {
                path: '/products',
                element: <ClientProducts/>
            }, {
                path: '/user',
                element: <Dashboard/>
            }
        ]
    },
]);

export default router;
