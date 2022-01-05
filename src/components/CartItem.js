import React from 'react'
import {appConfig} from "../configs/app";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {removeFromCart} from "../store/slices/cartSlice";
import {Trash} from "react-bootstrap-icons";
import IconButton from "./IconButton";

const CartItem = ({item}) =>{

    const dispatch = useDispatch();

    return(
        <div>
            <div>
                <div className={'my-2 d-flex justify-content-between'}>
                    <div className={'d-flex align-items-center'}>
                        <div style={{width: '70px', height: '70px'}}>
                            <img className={'w-full h-full'}
                                 src={appConfig.imageSource + item.product.thumbImage}/>
                        </div>
                        <div className={'ms-2'}>
                            <div>{item.product.name}</div>
                            <div>Qty: {item.quantity}</div>
                        </div>
                    </div>
                    <div className={'ms-10'}>
                        <div className={'font-bold'}>{item.product.price}</div>
                        <div>
                            <IconButton
                                onClick={() => dispatch(removeFromCart({id: item._id}))}
                                variant={'danger'}><Trash /></IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;
