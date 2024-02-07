
// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import './LoginPage.css';
import {Container, Form} from "react-bootstrap"; // Import your custom CSS file

const LoginPage = () => {
    const { login } = useAuth();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [showError, setShowError] = useState(false);
    const [unauthorizedError, setUnauthorizedError] = useState(false);
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
    console.log("click");
    const unAuthorizedErrors = {};

    if (!validateForm()) {
        // If form validation fails, show error and do not proceed with login
        console.log("validate")
        setShowError(true);
        setUnauthorizedError(false);
        return;
    }
        try {
            const response = await fetch('http://localhost:10010/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                // Check for specific case where email and password do not match
                if (response.status === 401) {
                    // setShowError(true);
                    setUnauthorizedError(true);
                    setShowError(false);
                } else {
                    throw new Error('Login failed');
                }
            } else {
                setShowError(false); // Reset other error states on successful login
                setUnauthorizedError(false);

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
        <Container>
            <MDBContainer className="my-5">
                <MDBCard>
                    <MDBRow className='g-0'>
                        <MDBCol md='6'>
                            <MDBCardImage
                                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp'
                                alt="login form" className='rounded-start w-100'/>
                        </MDBCol>
                        <MDBCol md='6'>
                            <MDBCardBody className='d-flex flex-column'>
                                <div className='d-flex flex-row mt-2'>
                                    <MDBIcon fas icon="cubes fa-3x me-3" style={{color: '#ff6219'}}/>
                                    <span className="h1 fw-bold mb-0">Logo</span>
                                </div>

                                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your
                                    account</h5>

                                {/* Your input fields with unique id attributes */}
                                <div className="mb-4">
                                    <label htmlFor="emailInput" className="form-label">Email address</label>
                                    <MDBInput
                                        id='emailInput'
                                        type='email'
                                        size="lg"
                                        value={loginData.email}
                                        onChange={handleInputChange}
                                        name="email"
                                        invalid={errors.email ? 'true' : 'false'}
                                    />
                                    {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="passwordInput" className="form-label">Password</label>
                                    <MDBInput
                                        id='passwordInput'
                                        type='password'
                                        size="lg"
                                        value={loginData.password}
                                        onChange={handleInputChange}
                                        name="password"
                                        invalid={errors.password ? 'true' : 'false'}  // Highlight the input if there's an error
                                    />
                                    {errors.password &&
                                        <Form.Text className="text-danger">{errors.password}</Form.Text>}
                                </div>

                                {/* Your login button */}
                                <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='button'
                                        onClick={handleLogin}>
                                    Login
                                </MDBBtn>

                                {/* Display error message */}
                                {unauthorizedError && (
                                    <p className="text-danger">Invalid email or password.</p>
                                )}

                                <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a
                                    href="/register" style={{color: '#393f81'}}>Register here</a></p>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </MDBContainer>
        </Container>
    );
};

export default LoginPage;
