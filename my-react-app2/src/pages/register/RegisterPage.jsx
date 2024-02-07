
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';
import './RegisterPage.css'

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [agreedToTerms, setAgreedToTerms] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleCheckboxChange = () => {
        setAgreedToTerms(!agreedToTerms);
    };

    const validateForm = () => {
        const errors = {};

        // Check for not-empty
        if (!formData.firstName.trim()) {
            errors.firstName = 'First Name is required';
        }

        if (!formData.lastName.trim()) {
            errors.lastName = 'Last Name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        }
        else if (!isValidEmail(formData.email)) {
            errors.email = 'Invalid email format';
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }
        if (!agreedToTerms) {
            errors.terms = 'You must agree to the Terms of Service';
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

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            // If form validation fails, do not proceed with signup
            return;
        }

        try {
            const response = await axios.post('http://localhost:10010/auth/signup', formData);
            console.log('Signup successful:', response.data);
            navigate('/login');
            // Handle success, redirect, or perform any other actions
        } catch (error) {
            console.error('Signup failed:', error.message);

            if (error.response && error.response.status === 400 && error.response.data === 'User already exists') {
                // Show alert for user already exists
                setErrors({ email: 'User already exists' });
            } else {
                // Handle other errors
                setErrors({}); // Clear previous errors
            }
        }
    };
    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)' }}>
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                    {/* Controlled components with value and onChange */}
                    <div className='mb-4'>
                        <label htmlFor='form1' className='form-label'>First Name</label>
                        <MDBInput size='lg' id='form1' type='text' name='firstName' value={formData.firstName} onChange={handleChange} />
                        {errors.firstName && <Form.Text className="text-danger">{errors.firstName}</Form.Text>}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='form2' className='form-label'>Last Name</label>
                        <MDBInput size='lg' id='form2' type='text' name='lastName' value={formData.lastName} onChange={handleChange} />
                        {errors.lastName && <Form.Text className="text-danger">{errors.lastName}</Form.Text>}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='form3' className='form-label'>Email</label>
                        <MDBInput size='lg' id='form3' type='email' name='email' value={formData.email} onChange={handleChange} />
                        {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='form4' className='form-label'>Password</label>
                        <MDBInput size='lg' id='form4' type='password' name='password' value={formData.password} onChange={handleChange} />
                        {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                    </div>

                    <div className='mb-4'>
                        <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree to all statements in Terms of service' onChange={handleCheckboxChange} />
                        {errors.terms && <span className="text-danger">{errors.terms}</span>}
                    </div>

                    {/* Submit button with onClick event handler */}
                    <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={handleSignup}>
                        Register
                    </MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default RegisterPage;

