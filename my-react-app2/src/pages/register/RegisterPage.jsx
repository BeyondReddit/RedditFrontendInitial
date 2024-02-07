// import React, { useState } from 'react';
// import axios from 'axios';
//
//     const RegisterPage = () => {
//         const [formData, setFormData] = useState({
//             firstName: '',
//             lastName: '',
//             email: '',
//             password: '',
//         });
//
//         const [errors, setErrors] = useState({});
//
//         const handleChange = (e) => {
//             const { name, value } = e.target;
//             setFormData({ ...formData, [name]: value });
//         };
//
//         const validateForm = () => {
//             const errors = {};
//
//             // Check for not-empty
//             if (!formData.firstName.trim()) {
//                 errors.firstName = 'First Name is required';
//             }
//
//             if (!formData.lastName.trim()) {
//                 errors.lastName = 'Last Name is required';
//             }
//
//             if (!formData.email.trim()) {
//                 errors.email = 'Email is required';
//             } else if (!isValidEmail(formData.email)) {
//                 errors.email = 'Invalid email format';
//             }
//
//             if (!formData.password.trim()) {
//                 errors.password = 'Password is required';
//             }
//
//             setErrors(errors);
//             return Object.keys(errors).length === 0; // Return true if no errors
//         };
//
//         const isValidEmail = (email) => {
//             // Simple email format validation
//             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//             return emailRegex.test(email);
//         };
//
//         const handleSignup = async (e) => {
//             e.preventDefault();
//
//             if (!validateForm()) {
//                 // If form validation fails, do not proceed with signup
//                 return;
//             }
//
//             try {
//                 const response = await axios.post('http://localhost:8000/auth/signup', formData);
//                 console.log('Signup successful:', response.data);
//                 // Handle success, redirect, or perform any other actions
//             } catch (error) {
//                 console.error('Signup failed:', error.message);
//                 // Handle error, display an error message, etc.
//             }
//         };
//
//         return (
//             <form onSubmit={handleSignup}>
//                 <div>
//                     <label>
//                         First Name:
//                         <input
//                             type="text"
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                     <span>{errors.firstName}</span>
//                 </div>
//                 <br />
//                 <div>
//                     <label>
//                         Last Name:
//                         <input
//                             type="text"
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                     <span>{errors.lastName}</span>
//                 </div>
//                 <br />
//                 <div>
//                     <label>
//                         Email:
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                     <span>{errors.email}</span>
//                 </div>
//                 <br />
//                 <div>
//                     <label>
//                         Password:
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                     <span>{errors.password}</span>
//                 </div>
//                 <br />
//                 <button type="submit">Signup</button>
//             </form>
//         );
//     };
//
// export default RegisterPage;
//
//
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
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
        }
        else if (!isValidEmail(formData.email)) {
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
            const response = await axios.post('http://localhost:8000/auth/signup', formData);
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
        <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <Form onSubmit={handleSignup}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            <Form.Text className="text-danger">{errors.firstName}</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                            <Form.Text className="text-danger">{errors.lastName}</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <Form.Text className="text-danger">{errors.email}</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <Form.Text className="text-danger">{errors.password}</Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Signup
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPage;

