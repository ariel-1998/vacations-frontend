import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CredentialsModel, credentialsSchema } from "../../../models/CredentialsModel";
import { authService } from "../../../services/authServic";
import { notifyService } from "../../../services/notifyService";
import "./Login.css";

function Login(): JSX.Element {


    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>({
        resolver: zodResolver(credentialsSchema)
    });

    function loginIn(credentials: CredentialsModel) {
        authService.login(credentials)
            .then(() => {
                navigate("/vacations");
                notifyService.success('welcome back!');
            })
            .catch(e => notifyService.error(e))
    }

    return (
        <Card className="auth-form shadow p-3 mb-5 bg-body rounded">
            <Form className="form" onSubmit={handleSubmit(loginIn)}>
                <h2 className="text-center">Login</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Email address:</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" 
                    {...register("email")} />
                    {errors.email && <Form.Text className="text-muted">
                        {errors.email.message}
                    </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                    {...register("password")} />
                    {errors.password &&
                        <Form.Text className="text-muted">
                            {errors.password.message}
                        </Form.Text>}
                </Form.Group>

                <div className="d-flex justify-content-center form-btns">
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <Button variant="warning" type="reset">
                        Reset
                    </Button>
                </div>
                <div className="d-flex flex-column text-center mt-3">
                    <span>Dont have an account?</span>
                    <Link to="/register">Register now</Link>
                </div>
            </Form>
        </Card>
    );
}

export default Login;
