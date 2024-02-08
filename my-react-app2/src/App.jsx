// src/App.jsx
import React from 'react';

import Header from "./components/header/Header.jsx";
import LoginPage from './pages/login/LoginPage.jsx';
import RegisterPage from './pages/register/RegisterPage.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VisitorHomePage from "./pages/visitor/visitor_home/VisitorHomePage.jsx";
import ContactAdminPage from './pages/contactus/ContactAdminPage.jsx';
import MessageManagementPage from './pages/admin/admin_message_management/AdminMessageManagementPage.jsx';





const App = () => {
    return (
        <Router>

            <Header />

            <Routes>

                <Route path="/visitor-home" element={<VisitorHomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/contactus" element={<ContactAdminPage />} />
                <Route path="/messages" element={<MessageManagementPage />} />
            </Routes>
        </Router>




    );
};

export default App;
