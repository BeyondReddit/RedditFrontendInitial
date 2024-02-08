import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext.jsx";

function MessageManagementPage() {
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate(); // Hook for navigation


    const { user1 } = useAuth();
    // useEffect(() => {
    //     // Redirect to login if user is not authenticated or not a user
    //     if (!user1 || user1 !== 'ADMIN') {
    //         navigate('/login');
    //     }
    // }, [user1, navigate]);

    useEffect(() => {
        fetchMessages();
    }, []);


    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:10010/messages/all', {
                headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
            });
            console.log(response);
            setMessages(response.data.messages); // Assuming the response has a `messages` array
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    const toggleMessageStatus = async (messageId, isClosed) => {
        console.log(isClosed);
        const endpoint = isClosed ? `/messages/${messageId}/open` : `/messages/${messageId}/close`;
        console.log(endpoint);
        try {
            await axios.patch(`http://localhost:10010${endpoint}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
            });
            fetchMessages(); // Refresh messages after updating status
        } catch (error) {
            console.error(`Failed to ${isClosed ? 'open' : 'close'} message:`, error);
        }
    };

    return (
        <Container>
            <h1>Message Management</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date Created</th>
                        <th>Subject</th>
                        <th>Email Address</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((message) => (
                        <tr>
                            <td>{message.dateCreated}</td>
                            <td>{message.subject}</td>
                            <td>{message.email}</td>
                            <td>{message.message}</td>
                            <td>{message.status}</td>
                            <td>
                                <Button 
                                    variant={message.status === 'open' ? "secondary" : "primary"} 
                                    onClick={() => toggleMessageStatus(message.userId, !(message.status === 'open'))}
                                >
                                    {message.status === 'open' ? "Close" : "Open"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default MessageManagementPage;
