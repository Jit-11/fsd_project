import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SignUp.css";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

const AdminSignUp = () => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            const user = { name, mobile, email, password };

            fetch("http://localhost:8585/admin/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("New Admin added:", data);
                    alert("Admin registered successfully!");
                    navigate("/admin-login");
                })
                .catch((error) => console.error("Error:", error));
        }
    };

    return (
        <>
            <div className="signUpBody">
                <Container>
                    <Row className="justify-content-center mt-5">
                        <Form noValidate validated={validated} onSubmit={handleSubmit} className="m-5 mt-2">
                            <Row className="mb-3 justify-content-center">
                                <Col md={5} className="signupContent border bg-white shadow p-5 pt-4">
                                    <div className="row mt-3 mb-3 text-center">
                                        <h3 className="loginform">Sign Up as Admin</h3>
                                    </div>
                                    <Form.Group as={Col} md="12" controlId="validationCustom01" className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Name"
                                            pattern="^[a-zA-Z\s]{2,20}$"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid name (2-20 letters).
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="12" controlId="validationCustomUsername" className="mb-3">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text>+91</InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Mobile Number"
                                                required
                                                pattern="^[789][0-9]{9}$"
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Enter a valid 10-digit mobile number.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} md="12" controlId="validationCustom04" className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email Address"
                                            required
                                            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Enter a valid email address.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="12" controlId="validationCustom03" className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            required
                                            pattern=".{8,}"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Password must be at least 8 characters long.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button type="submit" className="loginbtn btn btn-success w-100">
                                        Sign Up
                                    </Button>
                                    <div className="text-center pt-3">
                    <span>
                      Already have an account?{" "}
                        <p className="text-center">
                        <Link to="/admin-login">Login</Link>
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

export default AdminSignUp;
