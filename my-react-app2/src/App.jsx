// src/App.jsx
import React from 'react';

import Header from "./components/header/Header.jsx";
import LoginPage from './pages/login/LoginPage.jsx';
import RegisterPage from './pages/register/RegisterPage.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VisitorHomePage from "./pages/visitor/visitor_home/VisitorHomePage.jsx";
import HistoryPage from "./pages/user/user_profile/HistoryPage.jsx";





const App = () => {
    return (
        <Router>

            <Header />

            <Routes>

                <Route path="/visitor-home" element={<VisitorHomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/historyall" element={<HistoryPage />} />

            </Routes>
        </Router>




    );
};

export default App;
