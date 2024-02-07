import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import React , { useEffect }  from "react";
import { useNavigate } from 'react-router-dom';
const AdminHomePage = () => {
    const { user1 } = useAuth();
    const navigate = useNavigate();
    const toOther= () => {
        navigate('/usermanagement');

    }

    useEffect(() => {
      // Redirect to login if user is not authenticated or not a user
      if (!user1 || user1 !== 'ADMIN') {
        navigate('/login');
      }
    }, [user1, navigate]);
    return (
        <div>
            <h2>AdminHomePage</h2>
            <button onClick={toOther}>click</button>
        </div>
    );
}
export default AdminHomePage;