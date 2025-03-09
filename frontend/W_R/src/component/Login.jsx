import React, { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { getLoginDetailsFromServer } from "../services/ApiService";

const Login = () => {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validate = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email format";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await getLoginDetailsFromServer(formValues);
                console.log("API Response:", response.data);

                if (response.data === "Login successful") {
                    localStorage.setItem("user", JSON.stringify(formValues.email));
                    navigate("/"); 
                } else {
                    alert("Incorrect email or password");
                }
            } catch (error) {
                console.error("Error during login:", error);
                alert("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="signUpBody">
            <Container>
                <Row className="justify-content-center mt-5">
                    <Form noValidate validated={validated} onSubmit={handleSubmit} className="m-5 mt-2">
                        <Row className="mb-3 justify-content-center">
                            <Col md={5} className="signupContent border bg-white shadow p-5 pt-4">
                                <div className="text-center mb-3">
                                    <h3 className="loginform">User Login</h3>
                                </div>

                                <Form.Group as={Col} md="12" className="mb-3">
                                    <Form.Label>Enter Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email Address"
                                        name="email"
                                        value={formValues.email}
                                        onChange={handleChange}
                                        isInvalid={!!formErrors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
                                </Form.Group>

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

                                <Button type="submit" className="loginbtn btn btn-success w-100">
                                    Login
                                </Button>

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
    );
};

export default Login;
