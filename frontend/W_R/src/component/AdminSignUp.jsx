import React, { useState, useEffect } from "react";
import { Button, Col, Form, InputGroup, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SignUp.css";

const SignUp = () => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [timer, setTimer] = useState(180); // 3 minutes
    const [canResend, setCanResend] = useState(false);
    const navigate = useNavigate();

    // Timer countdown effect
    useEffect(() => {
        let countdown;
        if (otpSent && !otpVerified && timer > 0) {
            countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true); 
        }
        return () => clearInterval(countdown);
    }, [otpSent, timer, otpVerified]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Send OTP
    const handleSendOtp = () => {
        fetch(`http://localhost:8081/api/email/send-otp?email=${email}`, {
            method: "POST",
        })
            .then((response) => response.text())
            .then((data) => {
                if (data.includes("OTP sent")) {
                    setOtpSent(true);
                    setOtpVerified(false);
                    setTimer(180); // Reset timer to 3 minutes
                    setCanResend(false);
                    alert("OTP sent to your email!");
                } else {
                    alert("Failed to send OTP. Try again.");
                }
            })
            .catch((error) => console.error("Error:", error));
    };

    const handleVerifyOtp = () => {
        fetch(`http://localhost:8081/api/email/verify-otp?email=${email}&otp=${otp}`, {
            method: "POST",
        })
            .then((response) => response.text())
            .then((data) => {
                if (data.includes("OTP verified")) {
                    setOtpVerified(true);
                    setOtpSent(false); // Stop the timer
                    alert("OTP verified successfully!");
                } else {
                    alert("Invalid OTP. Try again.");
                }
            })
            .catch((error) => console.error("Error:", error));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || !otpVerified) {
            setValidated(true);
            alert("Please verify OTP before signing up.");
            return;
        }

        const user = { name, mobile, email, password };
        fetch("http://localhost:8081/admin/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        })
            .then((response) => response.text())
            .then((data) => {
                if (data.includes("Error")) {
                    alert("Email already exists! Please use a different email.");
                } else {
                    alert("User registered successfully!");
                    navigate("/admin-login");
                }
            })
            .catch((error) => console.error("Error:", error));
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
                                    <Form.Group as={Col} md="12" className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Name"
                                            pattern="^[a-zA-Z ]{2,20}$"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>

                                    {/* Mobile Number */}
                                    <Form.Group as={Col} md="12" className="mb-3">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>+91</InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Mobile Number"
                                                pattern="[6-9]{1}[0-9]{9}$"
                                                required
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    {/* Email & Send OTP Button */}
                                    <Form.Group as={Col} md="12" className="mb-3">
                                        <Form.Label>Enter Email</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="email"
                                                placeholder="Email Address"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <Button onClick={handleSendOtp} disabled={otpSent}>
                                                Send OTP
                                            </Button>
                                        </InputGroup>
                                    </Form.Group>

                                    {/* OTP Field - Only appears after OTP is sent */}
                                    {otpSent && (
                                        <Form.Group as={Col} md="12" className="mb-3">
                                            <Form.Label>Enter OTP</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter OTP"
                                                    required
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                />
                                                <Button onClick={handleVerifyOtp} disabled={otpVerified}>
                                                    Verify OTP
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>
                                    )}

                                    {/* OTP Timer & Resend Button */}
                                    {otpSent && !otpVerified && (
                                        <div className="mb-3">
                                            <span>Time left: {formatTime(timer)}</span>
                                            {canResend && (
                                                <Button onClick={handleSendOtp} className="ms-2" variant="warning">
                                                    Resend OTP
                                                </Button>
                                            )}
                                        </div>
                                    )}

                                    {/* Password */}
                                    <Form.Group as={Col} md="12" className="mb-3">
                                        <Form.Label>Set Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password (min 8 characters)"
                                            required
                                            minLength={8}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Form.Group>

                                    {/* Signup Button */}
                                    <Button type="submit" className="loginbtn btn btn-success w-100" disabled={!otpVerified}>
                                        Sign Up
                                    </Button>

                                    <div className="text-center pt-3">
                                        <span>
                                            Already have an account?
                                            <Link to="/login"> Login</Link>
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

export default SignUp;
