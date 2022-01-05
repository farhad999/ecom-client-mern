import React from "react";
import {CartFill} from 'react-bootstrap-icons'
import {Badge} from "react-bootstrap";

const CartButton = ({onClick, count}) => {
    return(
        <button onClick={onClick} style={{backgroundColor: 'transparent', border: 'unset'}}>
            <CartFill color={'white'} size={20} />
            <Badge bg={'success'}>{count}</Badge>
        </button>
    )
}

export default CartButton;
