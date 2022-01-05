import React from 'react'
import {Button, Card} from "react-bootstrap";
import {appConfig} from "../configs/app";
import {Link} from "react-router-dom";
import ClampLines from "react-clamp-lines";
import LinesEllipsis from "react-lines-ellipsis";

const ProductCard = ({product}) => {

    const {_id: id, slug, thumbImage, price, offerPrice, name} = product;

    return (
        <Card className={'my-1'}>
            <Link to={`/product/${slug}`} className={'product-image-container'}>
                <Card.Img variant="top" src={appConfig.imageSource + thumbImage}/>
            </Link>
            <Card.Body>
                <Card.Text style={{height: '45px'}}>
                    <LinesEllipsis text={name}
                                   maxLine={2}
                    />
                </Card.Text>
                <div className={'text-lg font-bold'}>
                    {offerPrice ? offerPrice : price}
                </div>
                <div style={{textDecoration: 'line-through'}}>
                    {offerPrice && price}
                </div>
                <div></div>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;
