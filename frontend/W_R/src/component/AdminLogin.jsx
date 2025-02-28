import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { getAdminLoginDetailsFromServer } from "../services/ApiService";
import Navigation from "./Navigation";

const AdminLogin = () => {
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await getAdminLoginDetailsFromServer(formValues);
                console.log(response.data);

                if (response.data === "Login successful") {
                    navigate("/admin-view");
                } else {
                    alert("Incorrect email or password");
                }
            } catch (error) {
                console.error("Login failed:", error);
                alert("Login failed. Please try again.");
            }
        }
    };

    const validate = (values) => {
        const errors = {};
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.email) {
            errors.email = "E-mail is required.";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "Enter a valid e-mail.";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 8) {
            errors.password = "Password must be at least 8 characters long.";
        }

        return errors;
    };

    return (
        <>
            <div className="signUpBody">
                <div className="container">
                    <Row className="justify-content-center mt-5">
                        <Form noValidate onSubmit={handleSubmit} className="m-5 mt-2">
                            <Row className="mb-3 justify-content-center">
                                <Col md={5} className="signupContent border bg-white shadow p-5 pt-4">
                                    <div className="row mt-3 mb-3 text-center">
                                        <h3 className="loginform">Admin Login</h3>
                                    </div>

                                    {/* Email Input */}
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
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* Password Input */}
                                    <Form.Group as={Col} md="12" className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={formValues.password}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* Login Button */}
                                    <Button type="submit" className="loginbtn btn btn-success w-100">
                                        Login
                                    </Button>

                                    {/* Sign Up Link */}
                                    <div className="text-center pt-3">
                    <span>
                      New user? <Link to="/admin-sign-up">Sign Up</Link>
                    </span>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
