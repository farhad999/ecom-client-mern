import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import axiosClient from "../utils/axiosClient";
import {appConfig} from "../configs/app";
import {toast} from 'react-hot-toast'
import {useNavigate} from "react-router-dom";
import {clearCart} from "../store/slices/cartSlice";
import CartItem from "../components/CartItem";

const Checkout = () => {

    let {items} = useSelector(state => state.cart);

    const {user} = useSelector(state => state.auth);

    const navigate = useNavigate();

    const shippingCharge = 70;

    const [openModal, setOpenModal] = React.useState(false);

    const dispatch = useDispatch();

    const getTotal = React.useMemo(() => {
        return items.reduce((acc, item) => {
            acc += item.product.price * item.quantity;
            return acc;
        }, 0);
    }, [JSON.stringify(items)]);

    const placeOrder = async () => {
        axiosClient.post('/orders')
            .then(res => {
                let {status, message, orderId} = res.data;

                if (status === 'success') {
                    toast.success(message);
                    navigate('/confirmed-order?orderId='+orderId);
                    dispatch(clearCart());
                }

                console.log("response", res.data);
            })
    }

    return (
        <Container>

            <Row className={'mt-2'}>
                <Col md={8}>
                    {items.map((item, index) => (
                        <CartItem key={index} item={item} />
                    ))}
                </Col>
                <Col md={4}>

                    <Card>
                        <Card.Body>

                            <h4>Checkout</h4>
                            <div className={'d-flex align-items-center justify-content-between'}>
                                <div>Products ({items.length})</div>
                                <div>{getTotal}</div>
                            </div>

                            <div className={'d-flex justify-content-between align-items-center'}>
                                <div>Shipping Charge</div>
                                <div>{shippingCharge}</div>
                            </div>

                            <hr/>
                            <div className={'d-flex justify-content-between align-items-center'}>
                                <div>Total</div>
                                <div>{getTotal + shippingCharge}</div>
                            </div>

                            <h5 className={'mt-2'}>
                                Shipping Address
                            </h5>
                            <div className={'my-2 d-flex justify-content-between align-items-center'}>
                                <div>Phone</div>
                                <div>{user.address?.phone}</div>
                            </div>
                            <hr/>
                            <div className={' my-2 d-flex align-items-center justify-content-between'}>
                                <div>
                                    Address
                                </div>
                                <div>
                                    {user.address.address}
                                </div>
                            </div>


                            <div className={'d-flex justify-content-between align-items-center'}>
                                <div>Payment</div>
                                <div>Cash on Delivery</div>
                            </div>

                            <div className={'my-2'}>
                                <Button disabled={!items.length} onClick={()=>setOpenModal(true)}>Place Order</Button>
                            </div>
                        </Card.Body>
                    </Card>


                </Col>
            </Row>

            <Modal show={openModal} onHide={()=>setOpenModal(false)}>
                <Modal.Header>
                    <Modal.Title>Confirm Your Order?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your order will be placed as Cash on Delivery. Are you sure?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>setOpenModal(false)}>Cancel</Button>
                    <Button onClick={placeOrder}>Confirm</Button>
                </Modal.Footer>
            </Modal>

        </Container>
    )

}

export default Checkout;
