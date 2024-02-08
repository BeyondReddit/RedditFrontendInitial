import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import RegisterPage from "./pages/register/RegisterPage.jsx";
import VisitorHomePage from "./pages/visitor/visitor_home/VisitorHomePage.jsx";
import ContactAdminPage from './pages/contactus/ContactAdminPage.jsx';
import MessageManagementPage from './pages/admin/admin_message_management/AdminMessageManagementPage.jsx';

import AdminHomePage from "./pages/admin/admin_home/AdminHomePage.jsx";
import UserHomePage from "./pages/user/user_home/UserHomePage.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import ProfilePage from "./pages/user/user_home/UserProfilePage.jsx";
import UserManagement from "./pages/admin/admin_home/UserManagement.jsx";
import EditProfile from "./pages/user/user_home/EditProfile.jsx";
import HistoryPage from "./pages/user/user_profile/HistoryPage.jsx";
import PostDetail from "./pages/user/post_detail/PostDetail.jsx";
import CreatePost from "./pages/user/create_post/CreatePost.jsx";

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
          <Route path="/historyall" element={<HistoryPage />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/post/new" element={<CreatePost />} />
          <Route path="/contactus" element={<ContactAdminPage />} />
          <Route path="/messages" element={<MessageManagementPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
