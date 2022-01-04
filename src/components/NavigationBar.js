import React from "react";
import {Link} from "react-router-dom";
import {Button, Container, Dropdown, DropdownButton, FormControl, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {appConfig} from "../configs/app";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/slices/authSlice";

const NavigationBar = () => {

    const {user} = useSelector(state => state.auth);

    const dispatch = useDispatch();


    return (
        <div style={{boxShadow: '0px 0px 5px 5px #eee'}}>
            <div style={{backgroundColor: '#129ae8'}}>
                <Container>
                    <div style={{height: '60px'}} className={'d-flex align-items-center justify-content-between'}>
                        <Link className={'nav-link'} to={'/'}>{appConfig.appName}</Link>
                        <FormControl style={{width: '400px'}} type={'text'} placeholder={'Search'}/>
                        <div className={'d-flex align-items-center'}>
                            <div className={'mx-2 text-white'}>Cart</div>
                            {
                                user ? <Dropdown>
                                        <Dropdown.Toggle variant={'outline-light'}>
                                            {user.name}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item>My Orders</Dropdown.Item>
                                            <Dropdown.Item>My Addresses</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={()=>dispatch(logout())}>Logout</Dropdown.Item>
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
        </div>
    )
}

export default NavigationBar;
