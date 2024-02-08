import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import {Button} from "react-bootstrap";

import UserForumList from "./UserForumList.tsx";
import UserForumProvider from "./UserForumProvider.tsx";

const UserHomePage = () => {
    const { user1 } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login if user is not authenticated or not a user
        if (!user1 || user1 !== 'USER') {
            navigate('/login');
        }
    }, [user1, navigate]);

    const toProfile= () => {
        navigate('/userprofilepage');

    }

    return (
        <div>
            <h2>Welcome to the User Home Page</h2>

            <Button onClick={toProfile}>User Profile</Button>
            <div>
                <UserForumProvider>
                    <UserForumList/>
                </UserForumProvider>
            </div>

            
            

        </div>
    );
};

export default UserHomePage;
