import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import { useForm, Controller } from "react-hook-form";
import FormLabel from "react-bootstrap/esm/FormLabel";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  const {
    formState: { errors },
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
    dispatch(login(data)).then(({ payload }) => {
      let { status, message } = payload;

      if (status === "success") {
        navigate("/");
      }
    });
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="d-none d-md-block col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <Card>
              <Card.Body>
                <form onSubmit={handleSubmit(doLogin)}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState: { error, isTouched } }) => (
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
                    render={({ field, fieldState: { error, isTouched } }) => (
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
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
