import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./components/header/Header.jsx";
import LoginPage from './pages/login/LoginPage.jsx';
import RegisterPage from './pages/register/RegisterPage.jsx';
import VisitorHomePage from "./pages/visitor/visitor_home/VisitorHomePage.jsx";
import AdminHomePage from "./pages/admin/admin_home/AdminHomePage.jsx";
import UserHomePage from "./pages/user/user_home/UserHomePage.jsx";
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

const App = () => {
    // useEffect(() => {
    //     // Redirect to the appropriate page based on authentication status
    //     if (user) {
    //         if (user === 'ADMIN') {
    //             // Use the Navigate component here
    //             window.location.href = "/admin-home";
    //         } else if (user === 'USER') {
    //             // Use the Navigate component here
    //             window.location.href = "/user-home";
    //         } else if (user === 'UNVERIFIED') {
    //             // Use the Navigate component here
    //             window.location.href = "/unverified-home";
    //         }
    //     } else {
    //         window.location.href = "/login"
    //     }
    // }, [user]);

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
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
