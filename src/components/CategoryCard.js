import React from "react";
import {Card} from "react-bootstrap";
import {appConfig} from "../configs/app";
import {Link} from "react-router-dom";

const CategoryCard = ({slug,type, image, name}) => {
    return(
        <Link to={`/products?${type}=${slug}`}>
            <Card className={'my-2'}>
                <div style={{width: '100%', aspectRatio: '1/1'}}>
                    <img width={'100%'} src={appConfig.imageSource+image} />
                </div>
                <Card.Title style={{textAlign: 'center', textTransform: 'capitalize'}}>{name}</Card.Title>
            </Card>
        </Link>

    )
}

export default CategoryCard;
