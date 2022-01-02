import React from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {toast} from "react-hot-toast";
import {Button, Modal, Form, Table, Card, Row, Col} from "react-bootstrap";
import {Trash, Plus, PencilSquare} from 'react-bootstrap-icons'
import {deleteProducts, fetchProducts} from "../../../store/slices/productSlice";
import {LinkContainer} from "react-router-bootstrap";

const Products = () => {
    const [open, setOpen] = React.useState(false);

    //product
    const {products, loading} = useSelector(state => state.product);

    const dispatch = useDispatch();
    const [selectedProduct, setSelectedProduct] = React.useState("");
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);


    React.useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const doDelete = () => {
        dispatch(deleteProducts({id: selectedProduct._id})).then(
            ({payload}) => {
                let {status, message} = payload;

                if (status === "success") {
                    toast.success(message);
                }
                setOpenDeleteDialog(false);
            }
        );
    };

    const selectAndOpenModal = (item) => {
        setSelectedProduct(item);
        setOpen(true);
    };

    const selectAndOpenDeleteModal = (item) => {
        setSelectedProduct(item);
        setOpenDeleteDialog(true);
    };

    const resetAndOpenModal = () => {
        setSelectedProduct(null);
        setOpen(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between my-2">
                <div className="text-lg font-bold">All Products</div>
                <LinkContainer to={'/admin/products/create'}>
                    <Button onClick={resetAndOpenModal}>
                        <Plus size={24}/> Create
                    </Button>
                </LinkContainer>

            </div>

            <div>

                {products.map((product, index) => (
                    <Card className={'my-1'}>
                        <Card.Body
                            key={index}
                            className={'d-flex justify-content-between align-items-center'}
                        >
                            <div className={'d-flex align-items-center'}>

                                <div style={{width: '70px', height: '70px', border: '1px solid #ededed'}}>
                                    <img style={{objectFit: 'contain', width: '100%', height: '100%'}}
                                         src={"http://localhost:4000/uploads/" + product.thumbImage} alt={'img'}/>
                                </div>

                                <div className={'ms-2'}>
                                    <div>{product.name}</div>
                                    <div>{product.brand && product.brand.name}</div>
                                </div>


                            </div>

                            <div>
                                <LinkContainer to={`/admin/products/create/${product._id}`}>
                                    <Button variant={'outline-primary'} onClick={() => selectAndOpenModal(product)}
                                            className={'mx-1'}>
                                        <PencilSquare />
                                    </Button>
                                </LinkContainer>

                                <Button variant={'outline-danger'} onClick={() => selectAndOpenDeleteModal(product)}
                                        className={'mx-1'}>
                                    <Trash/>
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}

            </div>

            <Modal
                show={openDeleteDialog}
                onHide={() => setOpenDeleteDialog(false)}
            >
                <Modal.Header>
                    <Modal.Title>
                        Do you want to delete this?
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>This Category will be deleted</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button>Cancel</Button>
                    <Button onClick={doDelete} variant="danger">
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Products;

