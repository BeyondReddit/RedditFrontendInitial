import React, { useState } from 'react';
import axios from 'axios';

    const RegisterPage = () => {
        const [formData, setFormData] = useState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        });

        const [errors, setErrors] = useState({});

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
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
            } else if (!isValidEmail(formData.email)) {
                errors.email = 'Invalid email format';
            }

            if (!formData.password.trim()) {
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

        const handleSignup = async (e) => {
            e.preventDefault();

            if (!validateForm()) {
                // If form validation fails, do not proceed with signup
                return;
            }

            try {
                const response = await axios.post('http://localhost:8000/auth/signup', formData);
                console.log('Signup successful:', response.data);
                // Handle success, redirect, or perform any other actions
            } catch (error) {
                console.error('Signup failed:', error.message);
                // Handle error, display an error message, etc.
            }
        };

        return (
            <form onSubmit={handleSignup}>
                <div>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <span>{errors.firstName}</span>
                </div>
                <br />
                <div>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <span>{errors.lastName}</span>
                </div>
                <br />
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <span>{errors.email}</span>
                </div>
                <br />
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <span>{errors.password}</span>
                </div>
                <br />
                <button type="submit">Signup</button>
            </form>
        );
    };

export default RegisterPage;


