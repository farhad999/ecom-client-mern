import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../store/slices/productSlice";
import {Controller} from "react-bootstrap-icons";
import {Col, Container, Row} from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import ProductSidebar from "../components/ProductSidebar";
import {queryParams} from "../utils/queryParams";
import {useLocation} from "react-router-dom";

const Products = () => {

    const {products, loading} = useSelector(state => state.product);

    const dispatch = useDispatch();

    const {search} = useLocation();

    //const params = queryParams()

    React.useEffect(() => {
        dispatch(fetchProducts({search}));
    }, [search]);

    if (loading) {
        return <div>loading</div>
    }

    return (
        <Container>
            <div className={'text-lg font-bold my-2'}>
                Products
            </div>

            <Row>
                {products.map((product, index) => (
                    <Col key={index} sm={4} md={3}>
                        <ProductCard product={product}/>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Products;
