import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SignUp.css";
import { Link } from "react-router-dom";
import  Navigation  from "./Navigation";

const SignUp = () => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        const user = { name, mobile, email, password };
        console.log(user);

        fetch("http://localhost:8585/user/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        }).then(() => {
            console.log("New User added");
        });
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
                                        <h3 className="loginform justify-content-center">Sign Up</h3>
                                    </div>

                                    <Form.Group as={Col} md="12" controlId="validationCustom01" className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Name"
                                            pattern="^[a-zA-Z ]{2,20}$"
                                            name="fname"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid name (2-20 characters).
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="12" controlId="validationCustomUsername" className="mb-3">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Mobile Number"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                pattern="[6-9]{1}[0-9]{9}$"
                                                name="mobile"
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a valid mobile number.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} md="12" controlId="validationCustom04" className="mb-3">
                                        <Form.Label>Enter Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email Address"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid email address.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="12" controlId="validationCustom03" className="mb-3">
                                        <Form.Label>Set Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password (min 8 characters)"
                                            name="password"
                                            required
                                            minLength={8}
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
                      Already have an account?
                      <p className="text-center">
                        <Link to="/login"> Login</Link>
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

export default SignUp ;
