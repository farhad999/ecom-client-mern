import React from "react";
import axiosClient from "../../utils/axiosClient";
import {Card, Dropdown, Modal, Table} from "react-bootstrap";
import {appConfig} from "../../configs/app";

const Orders = () => {

    const [orders, setOrders] = React.useState([]);

    const [orderDetails, setOrderDetails] = React.useState(null);

    const [selectedOrder, setSelectedOrder] = React.useState(null);

    const [openModal, setOpenModal] = React.useState(false)

    React.useEffect(() => {
        axiosClient.get('/orders/all')
            .then(res => {
                let {orders} = res.data;
                setOrders(orders);
            })
    }, [])

    const viewOrder = (order) => {
        axiosClient.get('/orders/' + order._id)
            .then(res => {
                let {order} = res.data;
                setOrderDetails(order);
                console.log('res', res.data);
                setOpenModal(true);
            })
    }

    return (
        <div>
            <h4 className={'my-2'}>Orders</h4>
            <Table>
                <thead>
                <tr>
                    <th>OrderId</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Action</th>
                </tr>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order._id}</td>
                        <td>{order.status}</td>
                        <td>{order.total}</td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle size={'sm'}>Action</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => viewOrder(order)}>View</Dropdown.Item>
                                    <Dropdown.Item>Edit</Dropdown.Item>
                                </Dropdown.Menu>

                            </Dropdown>
                        </td>
                    </tr>
                ))}
                </thead>
            </Table>

            <Modal show={openModal} onHide={() => setOpenModal(false)}>
                <Modal.Header>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        orderDetails &&

                        <div>
                            <div className={'my-2 d-flex justify-content-between'}>
                                <div className={'font-bold'}>
                                    Order Number
                                </div>
                                <div>{orderDetails._id}</div>
                            </div>

                            <div className={'my-2 d-flex justify-content-between'}>
                                <div className={'font-bold'}>Status</div>
                                <div className={'capitalize'}>{orderDetails.status}</div>
                            </div>

                            <h5>Products</h5>

                            <Card>
                                <Card.Body>

                                    {
                                        orderDetails.items.map((item, index) => (
                                            <div className={'d-flex justify-content-between'} key={index}>
                                                <div className={'d-flex'}>
                                                    <div style={{width: '70px', height: '70px'}}>
                                                        <img className={'w-full h-full'}
                                                             src={appConfig.imageSource + item.product.thumbImage}/>
                                                    </div>
                                                    <div className={'ms-2 font-bold'}>
                                                        {item.product.name}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>{item.price}</div>
                                                    <div>Qty: {item.quantity}</div>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </Card.Body>
                            </Card>

                            <div className={'my-2 d-flex justify-content-between'}>
                                <h5>Total Amount</h5>
                                <div>{orderDetails.total}</div>
                            </div>

                            <div className={'font-bold'}>
                                Ordered By:
                            </div>

                            <div className={'my-2 d-flex justify-content-between'}>
                                <div className={'font-bold'}>
                                    Name
                                </div>
                                <div>{orderDetails.user.name}</div>
                            </div>

                            <div className={'my-2 d-flex justify-content-between'}>
                                <div className={'font-bold'}>Phone</div>
                                <div>{orderDetails.user.address.phone}</div>
                            </div>

                            <div className={'my-2 d-flex justify-content-between'}>
                                <div className={'font-bold'}>Address</div>
                                <div>{orderDetails.user.address.address}</div>
                            </div>

                        </div>


                    }
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default Orders;
