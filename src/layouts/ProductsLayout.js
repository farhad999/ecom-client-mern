import React from 'react'
import {Col, Container, Row} from "react-bootstrap";
import ProductSidebar from "../components/ProductSidebar";
import {Outlet} from "react-router-dom";

const ProductsLayout = () => {
    return (
        <Container>
            <Row className={'mt-3'}>
                <Col md={3}>
                    <ProductSidebar/>
                </Col>
                <Col md={9}>
                    <div>
                        <Outlet/>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductsLayout;
