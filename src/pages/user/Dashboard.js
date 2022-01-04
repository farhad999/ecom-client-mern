import React from 'react'
import {useSelector} from "react-redux";
import ControllerInput from "../../components/ControllerInput";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {Button} from "react-bootstrap";
import axiosClient from "../../utils/axiosClient";
import {toast} from 'react-hot-toast'

const Dashboard = () => {

    const {user} = useSelector(state => state.auth);

    //form

    const profileSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().required(),
        phone: yup.string().required(),
        address: yup.string().required(),
    });

    const {handleSubmit, control, formState: {errors}} = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
            phone: user.address?.phone,
            address: user.address?.address,
        }, resolver: yupResolver(profileSchema)
    });

    const updateProfile = (data) => {

        axiosClient.post('/auth/update', data)
            .then(res=> {
                let {status, message} = res.data;
                if(status === 'success'){
                    toast.success(message);
                }
            })

        console.log('data', data);
    }

    return (
        <div>
            Hello <strong>{user.name}</strong>

            <form onSubmit={handleSubmit(updateProfile)}>

                <div className={'my-2'}>
                    <ControllerInput name={'name'} label={'Name'} control={control}
                                     errors={errors} placeholder={'Name'}
                    />
                </div>
                <div className={'my-2'}>
                    <ControllerInput name={'email'} label={'Email'} control={control}
                                     errors={errors} placeholder={'Email'}/>
                </div>

                <div className={'text-lg font-bold'}>Shipping Address</div>

                <div className={'my-2'}>
                    <ControllerInput name={'phone'} label={'Phone'} control={control}
                                     errors={errors} placeholder={'Phone'}
                    />
                </div>
                <div className={'my-2'}>
                    <ControllerInput name={'address'} label={'Address'} control={control}
                                     errors={errors} placeholder={'Address'}/>
                </div>

                <div className={'my-2'}>
                    <Button type={'submit'}>Save</Button>
                </div>
            </form>

        </div>
    )
}

export default Dashboard;
