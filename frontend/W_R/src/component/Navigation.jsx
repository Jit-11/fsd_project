import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";
import "../css/Navigation.css";
import logo from "../assets/logo-no-background.png";

const Navigation = () => {
    const [expanded, setExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const checkLoginStatus = () => {
        const user = localStorage.getItem("user");
        setIsLoggedIn(!!user); // Set isLoggedIn based on the presence of user
    };

    useEffect(() => {
        checkLoginStatus(); // Initial check

        const handleStorageChange = () => {
            checkLoginStatus(); // Re-check on storage change
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        checkLoginStatus(); // Update login status immediately
        navigate("/");
    };

    const menuItems = [
        { path: "/", label: "Home" },
        { path: "/add-product", label: "Add Product" },
        { path: "/marketplace", label: "MarketPlace" },
        { path: "/feedback", label: "Feedback" },
        { path: "/recycle-trail", label: "Recycle Trail" },
        { path: "/resources", label: "Resources" },
    ];

    return (
        <>
            <Navbar expand="lg" expanded={expanded} className="custom-navbar">
                <Container fluid>
                    <Navbar.Brand as={NavLink} to="/" onClick={() => setExpanded(false)}>
                        <img src={logo} className="logoimg" alt="Site Logo" />
                    </Navbar.Brand>

                    <Navbar.Toggle
                        aria-controls="navbar-nav"
                        onClick={() => setExpanded(!expanded)}
                    />

                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto justify-content-end flex-grow-1 pe-3">
                            {menuItems.map((item, index) => (
                                <Nav.Link
                                    key={index}
                                    as={NavLink}
                                    to={item.path}
                                    onClick={() => setExpanded(false)}
                                >
                                    {item.label}
                                </Nav.Link>
                            ))}
                        </Nav>

                        {isLoggedIn ? (
                            <Button variant="danger" onClick={handleLogout}>
                                Logout
                            </Button>
                        ) : (
                            <Button variant="success" onClick={() => setShowModal(true)}>
                                Login / SignUp
                            </Button>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Select User Type</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p>Are you logging in as a User or an Admin?</p>
                    <div className="d-flex justify-content-center gap-3">
                        <Button
                            variant="primary"
                            onClick={() => {
                                navigate("/login");
                                setShowModal(false);
                            }}
                        >
                            User Login
                        </Button>
                        <Button
                            variant="dark"
                            onClick={() => {
                                navigate("/admin-login");
                                setShowModal(false);
                            }}
                        >
                            Admin Login
                        </Button>
                    </div>
                    <hr />
                    <p>New here? Sign up below.</p>
                    <div className="d-flex justify-content-center gap-3">
                        <Button
                            variant="outline-primary"
                            onClick={() => {
                                navigate("/sign-up");
                                setShowModal(false);
                            }}
                        >
                            User SignUp
                        </Button>
                        <Button
                            variant="outline-dark"
                            onClick={() => {
                                navigate("/admin-sign-up");
                                setShowModal(false);
                            }}
                        >
                            Admin SignUp
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Navigation;