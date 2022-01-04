import React from "react";
import {useSelector} from "react-redux";
import {useNavigate, Outlet} from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import ProductSidebar from "../components/ProductSidebar";
import {Col, Container, Row} from "react-bootstrap";

const HomeLayout = () => {
    const navigate = useNavigate();

    const {user} = useSelector((state) => state.auth);

    if (user.role === "admin") {
        navigate("/admin", {replace: true});
    }

    console.log('user', user);

    return (
        <div>
            <NavigationBar/>
            <Container>
                <Row className={'mt-3'}>
                    <Col  md={3}>
                        <ProductSidebar/>
                    </Col>
                    <Col md={9}>
                        <div>
                            <Outlet/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default HomeLayout;
