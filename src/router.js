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
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/user/Dashboard";
import ConfirmedOrder from "./pages/ConfirmedOrder";
import MyOrders from "./pages/MyOrders";
import Orders from "./pages/admin/Orders";

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
            }, {
                path: '/admin/orders',
                element: <Orders/>
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
                path: '/checkout',
                element: <Checkout/>
            }, {
                path: '/user',
                element: <Dashboard/>
            },
            {
                path: '/user/orders',
                element: <MyOrders/>
            },
            {
                path: '/confirmed-order',
                element: <ConfirmedOrder/>
            }
        ]
    },
]);

export default router;
