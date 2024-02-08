// ContactAdminPage.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';


const ContactAdminPage = () => {
  const [formData, setFormData] = useState({
    subject: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    // Check for not-empty
    if (!formData.subject.trim()) {
        errors.subject = 'Subject is required';
    }

    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    }
    else if (!isValidEmail(formData.email)) {
        errors.email = 'Invalid email format';
    }

    if (!formData.message.trim()) {
        errors.message = 'Message is required';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        // If form validation fails, do not proceed with signup
        setShowAlert(true);
        setAlertContent('Please correct the errors before submitting.');
        return;
    }

    try {
        const token = localStorage.getItem('Authorization') || 'Guest'; // Make sure this matches how you've saved the token
        await axios.post('http://localhost:10010/messages', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token !== 'Guest' ? `Bearer ${token}` : undefined, // Add the token to your request headers
            },
        });
        setShowAlert(true);
        setAlertContent('Message sent successfully!');
        setFormData({
          subject: '',
          email: '',
          message: '',
        });
        setErrors({});
    } catch (error) {
        console.error(error);
        setShowAlert(true);
        setAlertContent('Error sending message. Please try again.');
    }
  };

  return (
    <Container>
      <h2>Contact Admin</h2>
      {showAlert && <Alert variant="info">{alertContent}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            isInvalid={!!errors.subject}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            isInvalid={!!errors.message}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default ContactAdminPage;
