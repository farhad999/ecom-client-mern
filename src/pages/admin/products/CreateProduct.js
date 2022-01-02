import React from 'react'
import {Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchBrands} from "../../../store/slices/brandSlice";
import {fetchCategories} from "../../../store/slices/categorySlice";
import {createOrUpdateProduct} from "../../../store/slices/productSlice";
import {toast} from "react-hot-toast";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import ControllerInput from "../../../components/ControllerInput";
import {useNavigate, useParams} from "react-router-dom";

const CreateProduct = () => {

    //brands
    const {brands, loading: {brandLoading}} = useSelector((state) => state.brand);
    //categories
    const {categories, loading: {catLoading}} = useSelector(state => state.cat);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const brandSchema = yup.object().shape({
        name: yup.string().required(),
        sku: yup.string(),
        stocks: yup.number('stock must be a number fsfsd').required(),
        price: yup.number().required(),
        offerPrice: yup.number(),
        brand: yup.string(),
        category: yup.string(),
        description: yup.string(),
    });

    const {register, handleSubmit, control, reset, formState: {errors}} = useForm({resolver: yupResolver(brandSchema)});

    React.useEffect(() => {

        if (!brands.length) {
            dispatch(fetchBrands());
        }

        if (!categories.length) {
            dispatch(fetchCategories())
        }
    }, []);

    function createProduct(data) {
        let {thumbImage, ...rest} = data;

        const formData = new FormData();

        for (let key in rest) {
            formData.append(key, rest[key]);
        }

        if(thumbImage && thumbImage.length){
            formData.append('thumbImage', thumbImage[0])
        }

        dispatch(createOrUpdateProduct(formData))
            .then(({payload}) => {
                let {status, message} = payload;

                if (status === "success") {
                    toast.success(message);
                    dispatch(fetchBrands());
                    reset({});
                    navigate('/admin/products');
                }
            });
    }

    if (catLoading || brandLoading) {
        return <div>Loading..</div>
    }

    return (
        <div>

            <form onSubmit={handleSubmit(createProduct)} encType="multipart/form-data">
                <Card>
                    <Card.Header>

                        <Card.Title>Create/Update Brand</Card.Title>

                    </Card.Header>

                    <Card.Body>

                        <Row>
                            {/* Product Name Input */}

                            <Col sm={12} md={6} className={'my-2'}>

                                <ControllerInput name={'name'} control={control}
                                                 placeholder={'Name'} label={'Product name*'} errors={errors}

                                />


                            </Col>


                            {/* Product SKU */}


                            <Col sm={6} md={3} className={'my-2'}>
                                <ControllerInput label={'Sku'} name={'sku'} control={control}
                                                 errors={errors} placeholder={'Sku'}
                                />
                            </Col>


                            <Col sm={6} md={3} className={'my-2'}>
                                <ControllerInput name={'stocks'} control={control}
                                                 placeholder={'Stock Quantity'} errors={errors} label={'Stock'}
                                />
                            </Col>


                            <Col sm={6} md={4} className={'my-2'}>
                                <ControllerInput label={'Price'} control={control}
                                                 placeholder={'Product Price'} name={'price'} errors={errors}
                                />
                            </Col>
                            <Col sm={6} md={4} className={'my-2'}>
                                <ControllerInput name={'offerPrice'} control={control}
                                                 placeholder={'Offer Price'} errors={errors} label={'Offer Price'}
                                />

                            </Col>


                            <Col md={4} className={'my-2'}>

                                <Controller render={({field, fieldState: {error}}) => (
                                    <Form.Group>
                                        <Form.Label>Select Brand</Form.Label>

                                        <Form.Select
                                            {...field}
                                            isInvalid={!!error}
                                        >
                                            <option value={''}>-select-one-</option>
                                            {
                                                brands.map((brand, index) => (
                                                    <option key={index} value={brand._id}>{brand.name}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                )} name={'brand'} control={control}

                                />
                            </Col>
                            <Col md={4} className={'my-2'}>
                                <Controller render={({field, fieldState: {error}}) => (
                                    <Form.Group>
                                        <Form.Label>Select Category</Form.Label>
                                        <Form.Select
                                            {...field}
                                            isInvalid={!!error}
                                        >
                                            <option value={''}>-select-one-</option>
                                            {
                                                categories.map((brand, index) => (
                                                    <option key={index} value={brand._id}>{brand.name}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                )} name={'category'} control={control}/>
                            </Col>
                            <Col md={4} className={'my-2'}>
                                <Form.Group>
                                    <Form.Label>Product Image</Form.Label>
                                    <Form.Control
                                        type={'file'}
                                        accept={'image/*'}
                                        {...register('thumbImage')}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={8} className={'my-2'}>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as={'textarea'} rows={3}
                                                  {...register('description')}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>

                    <Card.Footer>
                        <Button className={'mx-1'} type={'submit'}>Create</Button>
                    </Card.Footer>

                </Card>


            </form>
        </div>
    )
}

export default CreateProduct;
