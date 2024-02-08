import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Header = () => {
    const { user1, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (

        <Navbar bg="dark" variant="dark" className="header">
            <Container>
                <Navbar.Brand as={Link} to="/">Your Forum App</Navbar.Brand>
                <Nav className="me-auto">
                    {user1 ? (
                        <>
                            {user1 === 'ADMIN' && <Nav.Link as={Link} to="/admin-home">Admin Home</Nav.Link>}
                            {user1 === 'USER' && <Nav.Link as={Link} to="/user-home">User Home</Nav.Link>}
                        </>
                    ) : (
                        <Nav.Link as={Link} to="/visitor-home">Visitor Home</Nav.Link>
                    )}
                    <Nav.Link as={Link} to="/contactus">Contact </Nav.Link>
                </Nav>
                <Nav>
                    {!user1 ? (
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </>
                    ) : (
                        <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
