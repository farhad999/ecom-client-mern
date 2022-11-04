import React from 'react'
import {Button, Offcanvas} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {appConfig} from "../configs/app";
import {removeFromCart} from "../store/slices/cartSlice";

const CartSidebar = ({show, onClose}) => {

    const {items} = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const getTotal = React.useMemo(()=> {
        return items.reduce((acc, item)=> {
            acc+=item.product.price * item.quantity;
            return acc;
        }, 0);
    }, [JSON.stringify(items)]);

    return (
        <Offcanvas placement={'end'} show={show} onHide={onClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {items.map((item, index) => (
                    <div>
                        <div className={'my-2 d-flex justify-content-between'}>
                            <div className={'d-flex align-items-center'}>
                                <div style={{width: '70px', height: '70px'}}>
                                    <img className={'w-full h-full'} src={appConfig.imageSource + item.product.thumbImage}/>
                                </div>
                                <div>
                                    <div>{item.product.name}</div>
                                    <div>Qty: {item.quantity}</div>
                                </div>
                            </div>
                            <div className={'ms-10'}>
                                <div>{item.product.price}</div>
                                <div>
                                    <Button
                                        onClick={()=>dispatch(removeFromCart({id: item._id}))}
                                        variant={'danger'}>Remove</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <hr/>
                <div>Total: {getTotal}</div>
                <div>
                    <Button>Checkout</Button>
                </div>

            </Offcanvas.Body>
        </Offcanvas>
    )

}

export default CartSidebar;
