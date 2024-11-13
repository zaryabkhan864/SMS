
import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
// import MetaData from "../layout/MetaData";
import Form from 'react-bootstrap/Form';
import Cookies from "js-cookie";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [login, { isLoading, error, data }] = useLoginMutation();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
    
            navigate("/dashboard");
        }
        if (error) {
            console.log("error", error)
            toast.error(error?.data?.message);
        }
    }, [error, isAuthenticated]);

    const submitHandler = (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password,
        };

        login(loginData);
    };
    return (
        <div className="login-container">
            <Form className="login-form" onSubmit={submitHandler}>
                <div className="text-center">
                    <img className="img-fluid" src="../assets/logo.png" />
                </div>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        id="email_field"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="password_field"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button className="btn w-100 py-2"
                    variant="primary" type="submit"
                    disabled={isLoading} >
                    {isLoading ? "Authenticating..." : "LOGIN"}

                </Button>
                {/* <Button variant="primary" type="submit">
                    Submit
                </Button> */}
            </Form>
        </div>

    )
}

export default Login