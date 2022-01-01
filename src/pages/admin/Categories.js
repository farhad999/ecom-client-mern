import React from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {
    fetchCategories,
    deleteCategories, createOrUpdateCategory,
} from "../../store/slices/categorySlice";
import axiosClient from "../../utils/axiosClient";
import {toast} from "react-hot-toast";
import {Button, Modal, Form, Table, Card} from "react-bootstrap";
import {Trash,Plus} from 'react-bootstrap-icons'

const Categories = () => {
    const [open, setOpen] = React.useState(false);
    const {categories, loading} = useSelector((state) => state.cat);
    const dispatch = useDispatch();
    const [inputCategoryName, setInputCategoryName] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    React.useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const createCategory = () => {
        let data = {name: inputCategoryName};

        if (selectedCategory) {
            data.id = selectedCategory._id;
        }

        dispatch(createOrUpdateCategory(data))
            .then(({payload}) => {
                let {status, message} = payload;

                if (status === "success") {
                    toast.success(message);
                    dispatch(fetchCategories());
                    setInputCategoryName("");
                    setOpen(false);
                }
            });
    };

    const deleteCategory = () => {
        dispatch(deleteCategories({id: selectedCategory._id})).then(
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
        let {name} = item;

        setInputCategoryName(name);
        setSelectedCategory(item);
        setOpen(true);
    };

    const selectAndOpenDeleteModal = (item) => {
        setSelectedCategory(item);
        setOpenDeleteDialog(true);
    };

    const resetAndOpenModal = () => {
        setSelectedCategory(null);
        setOpen(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between my-2">
                <div className="text-lg font-bold">All Categories</div>
                <Button onClick={resetAndOpenModal}>
                    <Plus size={24} /> Create
                </Button>
            </div>

            <div>

                {categories.map((cat, index) => (
                    <Card className={'my-1'}>
                        <Card.Body
                            key={index}
                            className={'d-flex justify-content-between align-items-center'}
                        >
                            <div>{cat.name}</div>
                            <div>
                                <Button variant={'outline-primary'} onClick={() => selectAndOpenModal(cat)}
                                        className={'mx-1'}>Edit</Button>
                                <Button variant={'outline-danger'} onClick={() => selectAndOpenDeleteModal(cat)}
                                        className={'mx-1'}>
                                    <Trash/>
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}

            </div>

            <Modal title={"Add Categories"} show={open} onHide={() => setOpen(false)}>
                <Modal.Header>
                    <Modal.Title>Create/Update Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Form.Group>
                            <Form.Label>Category Name*</Form.Label>
                            <Form.Control
                                value={inputCategoryName}
                                onChange={(event) => setInputCategoryName(event.target.value)}
                            />
                        </Form.Group>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'outline-primary'}>Cancel</Button>
                    <Button onClick={createCategory}>Create</Button>
                </Modal.Footer>
            </Modal>

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
                    <Button onClick={deleteCategory} variant="danger">
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Categories;
