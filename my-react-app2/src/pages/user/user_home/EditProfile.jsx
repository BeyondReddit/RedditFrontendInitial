import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useAuth} from "../../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom"; // Import Bootstrap CSS

const EditProfile = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    newEmail: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [changesMade, setChangesMade] = useState(false);
  const { user1 } = useAuth();
  const navigate = useNavigate();
  console.log("user66666"+ user1);
  //
  // useEffect(() => {
  //   // Redirect to login if user is not authenticated or not a user
  //   if (!user1 || user1 !== 'USER') {
  //     navigate('/login');
  //   }
  // }, [user1, navigate]);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.get('http://localhost:10010/users/getUserByUserId', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data); // Assuming the API returns the user object directly
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to ${value}`); // Debugging line to check the input changes.
    setUser({ ...user, [name]: value });
    setChangesMade(true);
  };
  

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setChangesMade(true);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const uploadResponse = await axios.post('http://localhost:10010/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return uploadResponse.data.fileUri;
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

const saveProfile = async () => {
    let profileUpdated = false;
  
    // Check if a new file has been selected for upload
    if (selectedFile) {
      const newUrl = await uploadImage();
      // If a new image was successfully uploaded, update the profile image URL
      if (newUrl) {
        try {
          const token = localStorage.getItem('Authorization');
          await axios.post('http://localhost:10010/users/updateUserProfileImgUrl', { newUrl }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          profileUpdated = true; // Indicate that the profile has been updated
        } catch (error) {
          console.error('Error updating profile image URL:', error);
        }
      }
    }
  
    // If any changes were made to the user info or a new profile image was uploaded
    if (changesMade || profileUpdated) {
      try {
        const token = localStorage.getItem('Authorization');
        await axios.post('http://localhost:10010/users/updateUserInfo', {
          ...user,
          userId: JSON.parse(localStorage.getItem('user')).userId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Optionally, update the user in local storage if needed
        localStorage.setItem('user', JSON.stringify({ ...user, profileImageURL: profileUpdated ? newUrl : user.profileImageURL }));
  
        window.location.href = '/edit-profile'; // Redirect or refresh
      } catch (error) {
        console.error('Error saving profile:', error);
      }
    }
  };
  

  return (
    <Container>
      <Row>
        <Col>
          <h1>Edit Profile</h1>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder={user.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder={user.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder={user.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={saveProfile}>
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
















