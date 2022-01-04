import React from 'react'
import {Button, Card} from "react-bootstrap";
import {appConfig} from "../configs/app";
import {Link} from "react-router-dom";

const ProductCard = ({product}) =>{

    const {_id: id, slug, thumbImage, price, name} = product;

    return(
        <Card>
            <Link to={`/product/${slug}`} className={'product-image-container'}>
                <Card.Img variant="top" src={appConfig.imageSource+thumbImage} />
            </Link>
            <Card.Body>
                <Card.Text>{name}</Card.Text>
                <div>{price}</div>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;
