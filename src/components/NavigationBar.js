import React from "react";
import {Link} from "react-router-dom";
import {Badge, Button, Container, Dropdown, DropdownButton, FormControl, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {appConfig} from "../configs/app";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/slices/authSlice";
import {getUserCart} from "../store/slices/cartSlice";
import CartSidebar from "./CartSidebar";
import IconButton from "./IconButton";
import {Cart2} from "react-bootstrap-icons";
import CartButton from "./CartButton";

const NavigationBar = () => {

    const {user} = useSelector(state => state.auth);

    const {items} = useSelector(state => state.cart);

    const [showCart, setShowCart] = React.useState(false);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getUserCart());
    }, [user]);

    return (
        <div style={{boxShadow: '0px 0px 5px 5px #eee'}}>
            <div style={{backgroundColor: '#129ae8'}}>
                <Container>
                    <div style={{height: '60px'}} className={'d-flex align-items-center justify-content-between'}>
                        <Link className={'nav-link'} to={'/'}><h5
                            className={'font-bold text-white'}>{appConfig.appName}</h5></Link>
                        <FormControl className={'d-none d-md-block'} style={{width: '400px'}} type={'text'} placeholder={'Search'}/>
                        <div className={'d-flex align-items-center'}>
                            <div className={'mx-2 text-white'}>

                                {/* Cart Button */}

                                <CartButton onClick={() => setShowCart(true)} count={items.length}/>


                            </div>
                            {
                                user ? <Dropdown>
                                        <Dropdown.Toggle variant={'outline-light'}>
                                            {user.name}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <LinkContainer to={'/user'}>
                                                <Dropdown.Item>Dashboard</Dropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to={'/user/orders'}>
                                                <Dropdown.Item>My Orders</Dropdown.Item>
                                            </LinkContainer>

                                            <Dropdown.Divider/>
                                            <Dropdown.Item onClick={() => dispatch(logout())}>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    :
                                    <LinkContainer to={'/login'}>
                                        <Button>Login</Button>
                                    </LinkContainer>

                            }

                        </div>
                    </div>
                </Container>
            </div>
            <div style={{backgroundColor: 'white'}}>
                <Container>
                    <div className={'d-flex align-items-center'} style={{height: '40px'}}>
                        <Link className={'nav-link'} to={'/products'}>Products</Link>
                    </div>
                </Container>
            </div>

            <CartSidebar show={showCart} onClose={() => setShowCart(false)}/>

        </div>
    )
}

export default NavigationBar;
