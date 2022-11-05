import React from "react";
import axiosClient from "../utils/axiosClient";
import {Table} from "react-bootstrap";

const MyOrders = () => {

    const [orders, setOrders] = React.useState([]);

    React.useEffect(()=> {
        axiosClient.get('/orders')
            .then(res=> {
                let {orders} = res.data;
                setOrders(orders);
            })
    }, []);

    return(
        <div>
            <h4>My Orders</h4>
            <Table>
                <thead>
                <tr>
                    <th>Order Number</th>
                    <th>Status</th>
                    <th>Shipping Charge</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index)=> (
                    <tr key={index}>
                        <td>{order._id}</td>
                        <td>{order.status}</td>
                        <td>{order.shippingCharge}</td>
                        <td>{order.total}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default MyOrders;
