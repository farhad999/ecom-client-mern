import React from 'react'
import {Button, Offcanvas} from "react-bootstrap";
import {useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import CartItem from "./CartItem";

const CartSidebar = ({show, onClose}) => {

    const {items} = useSelector(state => state.cart);

    const getTotal = React.useMemo(() => {
        return items.reduce((acc, item) => {
            acc += item.product.price * item.quantity;
            return acc;
        }, 0);
    }, [JSON.stringify(items)]);

    return (
        <Offcanvas placement={'end'} show={show} onHide={onClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div style={{height: '75%', overflowY: 'auto'}}>
                    {items.map((item, index) => (
                        <CartItem key={index} item={item}/>
                    ))}
                </div>
                <hr/>
                <div>
                    <div className={'d-flex align-items-center justify-content-between'}>
                        <div className={'font-bold'}>Total</div>
                        <div>{getTotal}</div>
                    </div>
                    <div className={'mt-2'}>
                        <LinkContainer to={'/checkout'}>
                            <Button disabled={!items.length} className={'w-full'}>Checkout</Button>
                        </LinkContainer>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )

}

export default CartSidebar;
