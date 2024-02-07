import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const EditProfile = ({ history }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:10010/users/getUserByUserId', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data)); // Store user in localStorage
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const uploadResponse = await axios.post('http://localhost:10010/files/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:10010/users/updateUserProfileImgUrl', {
          newUrl: uploadResponse.data.fileUri,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:10010/users/updateUserInfo', {
        ...user, // Assuming the API accepts firstName, lastName, email directly
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem('user', JSON.stringify(user)); // Update user in localStorage
      history.push('/my-space'); // Redirect back to the profile page or wherever appropriate
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <Container>
      <h1>Edit Profile</h1>
      <Form onSubmit={handleSave}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            First Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="firstName" value={user.firstName} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Last Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="lastName" value={user.lastName} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" name="email" value={user.email} onChange={handleInputChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Profile Image
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="file" onChange={handleFileChange} />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default EditProfile;
