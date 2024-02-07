import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

const UserHomePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    console.log("user"+ user);

    useEffect(() => {
        // Redirect to login if user is not authenticated or not a user
        if (!user || user !== 'USER') {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div>
            <h2>Welcome to the User Home Page</h2>
            <p>Content specific to the user home page.</p>
        </div>
    );
};

export default UserHomePage;
