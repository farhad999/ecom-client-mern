import React from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {
    fetchBrands,
    deleteBrands, createOrUpdateBrand,
} from "../../store/slices/brandSlice";
import {toast} from "react-hot-toast";
import {Button, Modal, Form, Table, Card} from "react-bootstrap";
import {Trash, Plus} from 'react-bootstrap-icons'
import {useForm, Controller} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";

const Brands = () => {
    const [open, setOpen] = React.useState(false);
    const {brands, loading} = useSelector((state) => state.brand);
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const brandSchema = yup.object().shape({
        name: yup.string().required(),
        description: yup.string(),
    });

    const {register, handleSubmit, reset, formState: {errors}} = useForm({resolver: yupResolver(brandSchema)});

    React.useEffect(() => {
        dispatch(fetchBrands());
    }, []);

    const createBrand = (data) => {
        //let data = {name: inputCategoryName};

        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('description', data.name);
        formData.append('image', data.image[0]);

        if (selectedCategory) {
            formData.append('id', selectedCategory._id);
        }

        dispatch(createOrUpdateBrand(formData))
            .then(({payload}) => {
                let {status, message} = payload;

                if (status === "success") {
                    toast.success(message);
                    dispatch(fetchBrands());
                    reset({});
                    setOpen(false);
                }
            });
    };

    const deleteBrand = () => {
        dispatch(deleteBrands({id: selectedCategory._id})).then(
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
        let {name, image, description} = item;

        reset({
                name, image, description
            }
        )

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
                <div className="text-lg font-bold">All Brands</div>
                <Button onClick={resetAndOpenModal}>
                    <Plus size={24}/> Create
                </Button>
            </div>

            <div>

                {brands.map((cat, index) => (
                    <Card className={'my-1'}>
                        <Card.Body
                            key={index}
                            className={'d-flex justify-content-between align-items-center'}
                        >
                            <div className={'d-flex align-items-center'}>

                                <div style={{width: '70px', height: '70px', border: '1px solid #ededed'}}>
                                    <img style={{objectFit: 'contain', width: '100%', height: '100%'}}
                                         src={"http://localhost:4000/uploads/" + cat.image} alt={'img'}/>
                                </div>

                                <div className={'ml-2'}>{cat.name}</div>

                            </div>

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
                <form onSubmit={handleSubmit(createBrand)} encType="multipart/form-data">
                    <Modal.Header>
                        <Modal.Title>Create/Update Brand</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group>
                            <Form.Label>Brand Name*</Form.Label>
                            <Form.Control
                                {...register('name')}
                                type={'text'}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Brand Image</Form.Label>
                            <Form.Control
                                type={'file'}
                                accept={'image/*'}
                                {...register('image')}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as={'textarea'} rows={3}
                                          {...register('description')}
                            />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={'outline-primary'}>Cancel</Button>
                        <Button type={'submit'}>Create</Button>
                    </Modal.Footer>
                </form>
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
                    <Button onClick={deleteBrand} variant="danger">
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Brands;

