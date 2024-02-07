import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('Authorization'); // Retrieve token from local storage
      const response = await axios.get('http://localhost:10010/users/getAllUsers', {
        headers: {
          Authorization: `Bearer ${token}` // Use the token in the Authorization header
        }
      });
      if (Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        setError('Failed to fetch users: "users" property format is incorrect');
        console.error('Data is not an array:', response.data.users);
      }
    } catch (error) {
      setError('Failed to fetch users');
      console.error('Fetching users failed:', error);
    }
  };

  const updateUserActiveStatus = async (userId, isActive) => {
    try {
      const token = localStorage.getItem('Authorization'); // Retrieve token from local storage
      await axios.post('http://localhost:10010/users/updateUserActive', {
        userId,
        active: isActive,
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Use the token in the Authorization header
        }
      });
      fetchUsers(); // Refresh the users list to reflect changes
    } catch (error) {
      console.error('Updating user active status failed:', error);
    }
  };

  const updateUserType = async (userId, newType) => {
    try {
      const token = localStorage.getItem('Authorization'); // Retrieve token from local storage
      await axios.post('http://localhost:10010/users/updateUserType', {
        userId,
        newType,
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Use the token in the Authorization header
        }
      });
      fetchUsers(); // Refresh the users list to reflect changes
    } catch (error) {
      console.error('Updating user type failed:', error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Management</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date Joined</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.dateJoined}</td>
                <td>{user.type}</td>
                <td>
                  <Button variant="warning" onClick={() => updateUserActiveStatus(user.userId, !user.active)} style={{ marginRight: '10px' }}>
                    {user.active ? 'Ban' : 'Activate'}
                  </Button>
                  {user.type !== 'UnVerified' && (
                    <Button variant="info" onClick={() => updateUserType(user.userId, user.type === 'Admin' ? 'User' : 'Admin')}>
                      Change to {user.type === 'Admin' ? 'User' : 'Admin'}
                    </Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No users found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManagement;
