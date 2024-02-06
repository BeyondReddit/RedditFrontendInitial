// import React from "react";
//
// import { Container, Form, Button } from 'react-bootstrap';
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
//
//
// const LoginPage = () => {
//     const [loginData, setLoginData] = useState({
//         email: '',
//         password: '',
//     });
//
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setLoginData({ ...loginData, [name]: value });
//     };
//
//     const validateForm = () => {
//         const errors = {};
//
//         // Check for not-empty email
//         if (!loginData.email.trim()) {
//             errors.email = 'Email is required';
//         } else if (!isValidEmail(loginData.email)) {
//             errors.email = 'Invalid email format';
//         }
//
//         // Check for not-empty password
//         if (!loginData.password.trim()) {
//             errors.password = 'Password is required';
//         }
//
//         setErrors(errors);
//         return Object.keys(errors).length === 0; // Return true if no errors
//     };
//
//     const isValidEmail = (email) => {
//         // Simple email format validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };
//
//     const handleLogin = async (e) => {
//         e.preventDefault();
//
//         if (!validateForm()) {
//             // If form validation fails, do not proceed with login
//             return;
//         }
//
//         try {
//             const response = await fetch('http://localhost:8000/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(loginData),
//             });
//
//             if (!response.ok) {
//                 throw new Error('Login failed');
//             }
//
//             const token = await response.text(); // Assuming the token is returned as a plain text
//             console.log('Login successful. Authorization:', token);
//
//             // Store the token in local storage
//             localStorage.setItem('Authorization', token);
//             try {
//                 const response = await fetch('http://localhost:8000/auth/getCurrentUser', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`, // Include the token in the headers
//                     },
//                     credentials: 'include',
//                 });
//                 if (response.ok) {
//                     // If the request is successful, parse the response JSON
//                     const userData = await response.json();
//                     console.log('Current user:', userData);
//                     const userRole = userData.authorities;
//                     if (userRole === 'ADMIN') {
//                         navigate('/admin-home')
//
//                     }
//                     if (userRole === 'USER') {
//                         navigate('/User-home')
//                     }
//                     if (userRole === 'UNVERIFIED') {
//                         navigate('/unverified-home')
//                     }
//
//                 } else {
//                     console.error('Failed to fetch current user');
//                 }
//             } catch (error) {
//                 console.error('Role failed:', error.message);
//             }
//
//             // Example, replace with actual user role
//
//
//         } catch (error) {
//             console.error('Login failed:', error.message);
//         }
//     };
//
//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <label>
//                     Email:
//                     <input
//                         type="email"
//                         name="email"
//                         value={loginData.email}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </label>
//                 <span>{errors.email}</span>
//                 <br />
//                 <label>
//                     Password:
//                     <input
//                         type="password"
//                         name="password"
//                         value={loginData.password}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </label>
//                 <span>{errors.password}</span>
//                 <br />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
//
// };
//
// export default LoginPage;
import React, { useState } from "react";
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
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

                try {
                    const response = await fetch('http://localhost:8000/auth/getCurrentUser', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`, // Include the token in the headers
                        },
                        credentials: 'include',
                    });

                    if (response.ok) {
                        // If the request is successful, parse the response JSON
                        const userData = await response.json();
                        console.log('Current user:', userData);
                        const userRole = userData.authorities;

                        if (userRole === 'ADMIN') {
                            navigate('/admin-home')
                        } else if (userRole === 'USER') {
                            navigate('/user-home')
                        } else if (userRole === 'UNVERIFIED') {
                            navigate('/unverified-home')
                        }

                    } else {
                        console.error('Failed to fetch current user');
                    }
                } catch (error) {
                    console.error('Role failed:', error.message);
                }
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
