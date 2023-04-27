import { useForm } from "react-hook-form";
import { UserModel, UserSchema } from "../../../models/UserModel";
import "./Register.css";
import { authService } from "../../../services/authServic";
import { Button, Card, Form } from "react-bootstrap";
import { notifyService } from "../../../services/notifyService";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

function Register(): JSX.Element {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>({
        resolver: zodResolver(UserSchema)
    });

    function registration(newUser: UserModel) {
        authService.register(newUser)
            .then(() => {
                notifyService.success("Welcome!");
                navigate("/vacations");
            })
            .catch(e => notifyService.error(e))
    }

    return (
        <Card className="auth-form shadow p-3 mb-5 bg-body rounded">
            <Form className="form" onSubmit={handleSubmit(registration)}>
                <h2 className="text-center">Register</h2>

                <Form.Group className="mb-3">
                    <Form.Label>First name:</Form.Label>
                    <Form.Control type="text" placeholder="First name..." {...register("firstName")} />
                    {errors.firstName && <Form.Text className="text-muted">
                        {errors.firstName.message}
                    </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last name:</Form.Label>
                    <Form.Control type="text" placeholder="Last name..." {...register("lastName")} />
                    {errors.lastName &&
                        <Form.Text className="text-muted">
                            {errors.lastName.message}
                        </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email address:</Form.Label>
                    <Form.Control type="text" placeholder="Enter email..." {...register("email")} />
                    {errors.email && <Form.Text className="text-muted">
                        {errors.email.message}
                    </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password..." {...register("password")} />
                    {errors.password &&
                        <Form.Text className="text-muted">
                            {errors.password.message}
                        </Form.Text>}
                </Form.Group>

                <div className="d-flex justify-content-center form-btns">
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <Button variant="warning" type="reset">
                    Reset
                </Button>
                </div>
                
            </Form>
        </Card>
    );
}

export default Register;


