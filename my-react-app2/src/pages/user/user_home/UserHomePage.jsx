import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

const UserHomePage = () => {
    const { user1 } = useAuth();
    const navigate = useNavigate();
    console.log("user"+ user1);

    useEffect(() => {
        // Redirect to login if user is not authenticated or not a user
        if (!user1 || user1 !== 'USER') {
            navigate('/login');
        }
    }, [user1, navigate]);
    const toOther= () => {
        navigate('/editProfile');

    }
    const toProfile= () => {
        navigate('/userprofilepage');

    }

    return (
        <div>
            <h2>Welcome to the User Home Page</h2>
            <button onClick={toOther}>click</button>
            <button onClick={toProfile}>click</button>
            <p>Content specific to the user home page.</p>
        </div>
    );
};

export default UserHomePage;
