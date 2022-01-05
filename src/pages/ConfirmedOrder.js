import React from "react";
import {Button} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

const ConfirmedOrder = () => {
    return (
        <div>
            <h4>Order has been confirmed!</h4>
            <LinkContainer to={'user/order'}>
                <Button>View Orders</Button>
            </LinkContainer>
            <LinkContainer to={'/'}>
                <Button>Home</Button>
            </LinkContainer>

        </div>
    )
}

export default ConfirmedOrder;
