import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
const AdminHomePage = () => {
    const { user } = useAuth();

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h2>AdminHomePage</h2>
        </div>
    );
}
export default AdminHomePage;