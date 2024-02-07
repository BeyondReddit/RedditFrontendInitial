import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const MySpace = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('Authorization'); // Retrieve token from local storage
        const response = await axios.get('http://localhost:10010/users/getUserByUserId', {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token in the Authorization header
          },
        });
        setUser(response.data); // Assuming the API returns the user object directly
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error (e.g., set an error state, show a message, etc.)
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <Container>
      <h1>My Space</h1>
      <Row className="align-items-center my-3">
        <Col xs={12} md={4}>
          <Image src={user.profileImageURL} roundedCircle fluid />
        </Col>
        <Col xs={12} md={8}>
          <h2>{`${user.firstName} ${user.lastName}`}</h2>
          <p>Joined: {new Date(user.dateJoined).toLocaleDateString()}</p>
          <Button variant="primary" href="/edit-profile">Edit Profile</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MySpace;
