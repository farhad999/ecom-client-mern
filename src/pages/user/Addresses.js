import React from "react";
import axiosClient from "../../utils/axiosClient";
import {Button, Modal, Table} from "react-bootstrap";
import IconButton from "../../components/IconButton";
import {Pencil, PencilSquare, Trash} from 'react-bootstrap-icons'
import ControllerInput from "../../components/ControllerInput";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup'

const Addresses = () => {

    const [addresses, setAddresses] = React.useState([]);

    const [showModal, setShowModal] = React.useState(false);


    const schema = yup.object().shape({
       phone: yup.string().required(),
       address: yup.string().required(),
    });

    const {handleSubmit, formState: {errors}, control} = useForm({resolver: yupResolver(schema)});

    React.useEffect(() => {
        axiosClient.get('/addresses')
            .then(res => {
                let {addresses} = res.data;
                setAddresses(addresses);
            })
    }, []);

    const addAddress = (data) => {

    }

    return (
        <div>
            <div className={'d-flex align-items-center justify-content-between'}>
                <div className={'text-lg font-bold'}>Address</div>
                <Button onClick={()=>setShowModal(true)}>Create</Button>
            </div>

            <Table>
                <thead>
                <tr>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {addresses.map((address, index) => (
                    <tr key={index}>
                        <td>{address.phone}</td>
                        <td>{address.address}</td>
                        <td>
                            <IconButton><PencilSquare size={20} color={'#1a8ebe'} /></IconButton>
                            <IconButton><Trash size={20} color={'#e84954'} /></IconButton>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={()=>setShowModal(false)}>
                <form onSubmit={handleSubmit(addAddress)}>
                <Modal.Header>
                    <Modal.Title>Add Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'my-2'}>
                        <ControllerInput name={'phone'} label={'Phone'} control={control}
                        placeholder={'phone'} errors={errors}
                        />
                    </div>
                    <div className={'my-2'}>
                        <ControllerInput label={'Address'} name={'address'}
                        placeholder={'Address'} control={control} errors={errors}
                        />
                    </div>
                </Modal.Body>
                    <Modal.Footer>
                        <Button>Cancel</Button>
                        <Button>Save</Button>
                    </Modal.Footer>
                </form>
            </Modal>

        </div>
    )
}

export default Addresses;
