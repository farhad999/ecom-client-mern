import React from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {
    fetchCategories,
    deleteCategories, createOrUpdateCategory,
} from "../../store/slices/categorySlice";
import {toast} from "react-hot-toast";
import {Button, Modal, Form, Table, Card, Image} from "react-bootstrap";
import {Trash, Plus, Controller} from 'react-bootstrap-icons'
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import ControllerInput from "../../components/ControllerInput";
import {appConfig} from "../../configs/app";

const Categories = () => {
    const [open, setOpen] = React.useState(false);
    const {categories, loading} = useSelector((state) => state.cat);
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);


    //form

    const categorySchema = yup.object().shape({
        name: yup.string().required(),
        description: yup.string(),
        child: yup.string(),
    });

    const {handleSubmit, register, formState: {errors}, reset, control} = useForm({resolver: yupResolver(categorySchema)});

    React.useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const createCategory = (data) => {

        const {image, ...rest} = data;

        const formData = new FormData();

        if (image && image.length) {
            formData.append('image', image[0]);
        }

        for (let key in rest) {
            formData.append(key, rest[key]);
        }

        if (selectedCategory) {
            formData.append('id', selectedCategory._id);
        }

        dispatch(createOrUpdateCategory(formData))
            .then(({payload}) => {
                let {status, message} = payload;

                if (status === "success") {
                    toast.success(message);
                    dispatch(fetchCategories());
                    reset({});
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
        let {name, description} = item;
        setSelectedCategory(item);
        setOpen(true);
        reset({name, description});
    };

    const selectAndOpenDeleteModal = (item) => {
        setSelectedCategory(item);
        setOpenDeleteDialog(true);
    };

    const resetAndOpenModal = () => {
        reset({});
        setSelectedCategory(null);
        setOpen(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log('errors', errors);

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between my-2">
                <div className="text-lg font-bold">All Categories</div>
                <Button onClick={resetAndOpenModal}>
                    <Plus size={24}/> Create
                </Button>
            </div>

            <div>

                {categories.map((cat, index) => (
                    <Card key={index} className={'my-1'}>
                        <Card.Body

                            className={'d-flex justify-content-between align-items-center'}
                        >
                            <div className={'d-flex align-items-center'}>
                                <div style={{width: '70px', height: '70px', border: '1px solid #eee'}} className={'position-relative'}>
                                    <img className={'w-full h-full'} src={appConfig.imageSource+cat.image} />
                                </div>
                                <div className={'capitalize font-bold ms-2'}>{cat.name}</div>
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

                <form onSubmit={handleSubmit(createCategory)} encType={'multipart/form-data'}>

                    <Modal.Header>
                        <Modal.Title>Create/Update Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <div className={'my-2'}>
                            <ControllerInput
                                label={'Category Name*'}
                                name={'name'}
                                errors={errors}
                                placeholder={'Category Name'}
                                control={control}

                            />
                        </div>

                        <div className={'my-2'}>
                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type={'file'} {...register('image')} />
                            </Form.Group>

                        </div>

                        <div className={'my-2'}>
                            <ControllerInput
                                label={'Description'}
                                name={'description'}
                                errors={errors}
                                placeholder={'Description'}
                                control={control}
                                as={'textarea'}
                            />
                        </div>


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
                    <Button onClick={deleteCategory} variant="danger">
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Categories;
