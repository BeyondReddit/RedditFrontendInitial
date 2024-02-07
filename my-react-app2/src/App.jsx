import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./components/header/Header.jsx";
import LoginPage from './pages/login/LoginPage.jsx';
import RegisterPage from './pages/register/RegisterPage.jsx';
import VisitorHomePage from "./pages/visitor/visitor_home/VisitorHomePage.jsx";
import AdminHomePage from "./pages/admin/admin_home/AdminHomePage.jsx";
import UserHomePage from "./pages/user/user_home/UserHomePage.jsx";
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import ProfilePage from './pages/user/user_home/UserProfilePage.jsx';
import UserManagement from './pages/admin/admin_home/UserManagement.jsx';
import EditProfile from './pages/user/user_home/EditProfile.jsx';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path="/visitor-home" element={<VisitorHomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/admin-home" element={<AdminHomePage />} />
                    <Route path="/user-home" element={<UserHomePage />} />
                    <Route path="/editprofile" element={<EditProfile />} />
                    <Route path="/userprofilepage" element={<ProfilePage />} />
                    <Route path="/usermanagement" element={<UserManagement />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
