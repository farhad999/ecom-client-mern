import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {viewProduct} from "../store/slices/productSlice";
import {Link, useParams} from "react-router-dom";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {appConfig} from "../configs/app";
import {addToCart} from "../store/slices/cartSlice";
import {toast} from 'react-hot-toast'

const Product = () => {

    const {productDetails, loading} = useSelector(state => state.product);
    const dispatch = useDispatch();
    let {slug} = useParams();

    React.useEffect(() => {
        dispatch(viewProduct({slug}));
        console.log("product", slug);
    }, [slug]);

    if (loading) {
        console.log('loadingggg');
        return <div>loading</div>
    }

    function addCart() {
        dispatch(addToCart({product: productDetails}))
            .then(({payload})=> {
                let {status, message} = payload;
                if(status === 'success'){
                    toast.success(message);
                }else{
                    toast.error(message);
                }
            })
    }

    return (
        <Container>
            <div>
                <div>Product Details</div>
                <Row>
                    <Col md={4}>
                        <img className={'w-full'} src={appConfig.imageSource + productDetails.thumbImage}/>
                    </Col>
                    <Col md={8}>
                        <h2>{productDetails.name}</h2>
                        <div>
                            <div>Brand: <Link to={`/products?brand=${productDetails.brand?.slug}`}>{productDetails.brand?.name} </Link> </div>
                            <div>Category: <Link to={`/products?category=${productDetails.category?.slug}`}>{productDetails.category?.name}</Link> </div>
                        </div>

                        <hr/>

                        <div>In Stock</div>
                        <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{productDetails.offerPrice ? productDetails.offerPrice : productDetails.price}</div>
                        <div className={'text-decoration-line-through'}>{productDetails.offerPrice && productDetails.price}</div>

                        <Button className={'mt-3'} onClick={addCart}>Add to Cart</Button>

                    </Col>
                </Row>
                <div className={'mt-3'}>Description</div>
                <div>
                    {productDetails.description}
                </div>
            </div>
        </Container>
    )

}

export default Product;
