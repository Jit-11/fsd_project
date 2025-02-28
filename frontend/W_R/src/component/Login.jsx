import React, { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { getLoginDetailsFromServer } from "../services/ApiService";
import Navigation from "./Navigation";

const Login = () => {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({});
    const [isError, setIsError] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        setIsError(Object.keys(errors).length > 0);
        setValidated(true);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await getLoginDetailsFromServer(formValues);
                console.log(response.data);

                if (response.data === "Login successful") {
                    navigate("/marketplace");
                } else {
                    alert("Incorrect email or password");
                }
            } catch (error) {
                console.error("Error during login:", error);
                alert("Something went wrong. Please try again.");
            }
        }
    };

    const validate = (values) => {
        const errors = {};
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.email) {
            errors.email = "E-mail is required.";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "Enter a valid E-mail.";
        }

        if (!values.password) {
            errors.password = "Password is required.";
        } else if (values.password.length < 8) {
            errors.password = "Password length must be at least 8 characters.";
        }

        return errors;
    };

    return (
        <>
            <div className="signUpBody">
                <Container>
                    <Row className="justify-content-center mt-5">
                        <Form noValidate validated={validated} onSubmit={handleSubmit} className="m-5 mt-2">
                            <Row className="mb-3 justify-content-center">
                                <Col md={5} className="signupContent border bg-white shadow p-5 pt-4">
                                    <div className="text-center mb-3">
                                        <h3 className="loginform">User Login</h3>
                                    </div>

                                    {/* Email Field */}
                                    <Form.Group as={Col} md="12" className="mb-3">
                                        <Form.Label>Enter Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Email Address"
                                            name="email"
                                            value={formValues.email}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
                                    </Form.Group>

                                    {/* Password Field */}
                                    <Form.Group as={Col} md="12" className="mb-3">
                                        <Form.Label>Set Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={formValues.password}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback>
                                    </Form.Group>

                                    {/* Login Button */}
                                    <Button type="submit" className="loginbtn btn btn-success w-100">
                                        Login
                                    </Button>

                                    {/* Sign-Up Link */}
                                    <div className="text-center pt-3">
                    <span>
                      New user?{" "}
                        <p className="text-center">
                        <Link to="/sign-up">Sign Up</Link>
                      </p>
                    </span>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Login;
