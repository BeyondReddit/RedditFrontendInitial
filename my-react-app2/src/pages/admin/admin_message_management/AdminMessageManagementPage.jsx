import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';

function MessageManagementPage() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:10010/messages/all', {
                headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
            });
            setMessages(response.data.messages); // Assuming the response has a `messages` array
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    const toggleMessageStatus = async (messageId, isClosed) => {
        const endpoint = isClosed ? `/messages/${messageId}/open` : `/messages/${messageId}/close`;
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
                        <th>ID</th>
                        <th>Subject</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((message) => (
                        <tr key={message.id}>
                            <td>{message.id}</td>
                            <td>{message.subject}</td>
                            <td>{message.email}</td>
                            <td>{message.status}</td>
                            <td>
                                <Button 
                                    variant={message.status === 'open' ? "secondary" : "primary"} 
                                    onClick={() => toggleMessageStatus(message.id, message.status === 'open')}
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
