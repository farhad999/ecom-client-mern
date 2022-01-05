import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Outlet} from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import ProductSidebar from "../components/ProductSidebar";
import {Col, Container, Row} from "react-bootstrap";
import {fetchCategories} from "../store/slices/categorySlice";
import {fetchBrands} from "../store/slices/brandSlice";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const HomeLayout = () => {
    const navigate = useNavigate();

    const {user} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchBrands());
    }, []);

    if (user.role === "admin") {
        navigate("/admin", {replace: true});
    }

    return (
        <div>
            <NavigationBar/>
            <div>
                <Outlet/>
            </div>
        </div>
    )
};

export default HomeLayout;
