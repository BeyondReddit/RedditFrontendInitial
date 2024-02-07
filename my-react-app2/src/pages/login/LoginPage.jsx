// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import {Alert, Button, Container, Form} from "react-bootstrap";

const LoginPage = () => {
    const { login } = useAuth();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const validateForm = () => {
        const errors = {};

        // Check for not-empty email
        if (!loginData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(loginData.email)) {
            errors.email = 'Invalid email format';
        }

        // Check for not-empty password
        if (!loginData.password.trim()) {
            errors.password = 'Password is required';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };
    const isValidEmail = (email) => {
        // Simple email format validation
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            // If form validation fails, show error and do not proceed with login
            setShowError(true);
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                // Check for specific case where email and password do not match
                if (response.status === 401) {
                    setShowError(true);
                } else {
                    throw new Error('Login failed');
                }
            } else {
                setShowError(false); // Reset error state on successful login

                const token = await response.text(); // Assuming the token is returned as plain text
                console.log('Login successful. Authorization:', token);

                // Store the token in local storage
                localStorage.setItem('Authorization', token);

                // Call the login function to set the user state and save the token
                login(token);

            }
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Login</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleInputChange}
                        isInvalid={errors.email}
                        required
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleInputChange}
                        isInvalid={errors.password}
                        required
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>

                {showError && <Alert variant="danger" className="mt-3">Invalid email or password</Alert>}
            </Form>
        </Container>
    );
};

export default LoginPage;
