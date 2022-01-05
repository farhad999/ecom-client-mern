import React from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup'
import ControllerInput from "../../components/ControllerInput";
import {useForm} from "react-hook-form";
import {Button} from "react-bootstrap";
import axiosClient from "../../utils/axiosClient";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";

const Register = () => {

    const navigate = useNavigate();

    const userSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),

    });

    const {handleSubmit, control, formState: {errors}} = useForm({
        resolver: yupResolver(userSchema),
    });

    const doRegister = (data) => {
        axiosClient.post('/auth/register', data)
            .then(res => {
                let{status, message} = res.data;
                if(status === 'success') {
                    toast.success(message);
                    navigate('/login');
                }
            })
    }

    return (
        <div style={{height: "100vh"}}>
            <div className={'container'}>


                <div className={'mt-5 row justify-content-center align-items-center'}>

                    <div className={'col-sm-4 col-sm-offset-4'}>

                        <form onSubmit={handleSubmit(doRegister)}>

                            <div>
                                <ControllerInput name={'name'} label={'Name'} errors={errors}
                                                 control={control} placeholder={'Enter Name'}/>
                            </div>
                            <div>
                                <ControllerInput name={'email'} label={'Email'} errors={errors}
                                                 control={control} placeholder={'Email'}/>
                            </div>

                            <div>
                                <ControllerInput name={'password'} label={'password'} errors={errors}
                                                 control={control} placeholder={'Password'}
                                />
                            </div>
                            <Button className={'mt-3'} type={'submit'}>Register</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
