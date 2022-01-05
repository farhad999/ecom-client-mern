import React from "react";
import axios from "axios";
import axiosClient from "../utils/axiosClient";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../store/slices/categorySlice";
import CategoryCard from "../components/CategoryCard";
import {Col, Container, Row} from "react-bootstrap";

const Home = () => {

    let {categories, loading: catLoading} = useSelector(state => state.cat);

    let {brands, loading: brandLoading} = useSelector(state => state.brand);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    React.useEffect(() => {

        axiosClient.get('/')
            .then(res => {

            })
    }, []);

    return (
        <div>


            <div className={'py-5'} style={{backgroundColor: '#ffdddf'}}>
                <Container>
                    <div className={'mb-2'} style={{textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bolder'}}>
                        Shop By Categories
                    </div>
                    <Row>
                        {categories.map((cat, index) => (
                            <Col md={3} lg={2} sm={4} xs={6}>
                                <CategoryCard type={'brand'} key={index} slug={cat.slug} name={cat.name} image={cat.image}/>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>

            <div className={'py-5'} style={{backgroundColor: '#8eddec'}}>

                <Container>

                    <div className={'text-lg font-bold text-center my-2'}>
                        Shop By Brands
                    </div>

                    <Row>
                        {brands.map((brand, index) => (
                            <Col lg={2} md={3} sm={4} xs={6}>
                                <CategoryCard type={'brand'} key={index} slug={brand.slug} name={brand.name} image={brand.image}/>
                            </Col>
                        ))}
                    </Row>
                </Container>

            </div>
        </div>
    )
};
export default Home;
