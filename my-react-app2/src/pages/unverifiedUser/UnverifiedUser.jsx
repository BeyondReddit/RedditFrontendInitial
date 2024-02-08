import React, {useEffect} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const  UnverifiedUser = () => {
    const { user1 } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login if user is not authenticated or not a user
        if (!user1 || user1 !== 'UNVERIFIED') {
            navigate('/login');
        }
    }, [user1, navigate]);



    return (
        <div className="container">
            <h2>Unverified Page</h2>
            <p>This is the Unverified User Page. You can verify your email </p>
        </div>
    )


}


export default UnverifiedUser;