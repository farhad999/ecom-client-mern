import React from "react";
import Image1 from '../assets/1.jpg'
import Slider from 'react-slick'

const Carousel = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return(
        <Slider {...settings}>
            <div className={'w-full'}>
                <img className={'w-full'} src={Image1} />
            </div>
        </Slider>
    )

}
export default Carousel;
