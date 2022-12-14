import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import {LinkContainer} from "react-router-bootstrap";
import {useForm, Controller} from "react-hook-form";
import FormLabel from "react-bootstrap/esm/FormLabel";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch} from "react-redux";
import {fetchUser, login} from "../../store/slices/authSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {appConfig} from "../../configs/app";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
    });

    const {
        formState: {errors},
        handleSubmit,
        control,
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const doLogin = (data) => {
        dispatch(login(data)).then(({payload}) => {
            let {status, message} = payload;

            if (status === "success") {
                toast.success("Login Success full");
                dispatch(fetchUser());
                navigate("/");
            } else {
                toast.error(message);
            }
        });
    };

    return (
        <div className={'vh-100'}>
<div className={'container'}>


            <div className={'row justify-content-center'}>

            <div className={'col-sm-4 col-sm-offset-4'}>

                <div className={'text-center text-lg font-bold'}>
                    {appConfig.appName}
                </div>

                <form onSubmit={handleSubmit(doLogin)}>
                    <Controller
                        name="email"
                        control={control}
                        render={({field, fieldState: {error, isTouched}}) => (
                            <Form.Group className="my-2">
                                <FormLabel>Email</FormLabel>
                                <Form.Control
                                    type="text"
                                    placeholder="Email"
                                    {...field}
                                    isInvalid={!!error}
                                    isValid={isTouched && !error}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({field, fieldState: {error, isTouched}}) => (
                            <Form.Group className="my-2">
                                <FormLabel>Password</FormLabel>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    {...field}
                                    isInvalid={!!error}
                                    isValid={isTouched && !error}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        )}
                    />

                    <div>
                        <Button type="submit" className="d-block w-full">
                            Sign in
                        </Button>
                    </div>

                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0 text-muted">
                            OR
                        </p>
                    </div>

                    <LinkContainer to="/register">
                        <Button className="d-block w-full">Register</Button>
                    </LinkContainer>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Login;
