
import { useAuth } from '../../../context/AuthContext';

import React, { useState, useEffect } from 'react';
import PostItem from '../../../components/PostItem/PostItem';
import { getBannedPosts, getUnbannedPosts, getDeletedPosts } from './adminHomePageLogic';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS
import { useNavigate } from 'react-router-dom';
import {Button, Row} from "react-bootstrap"; // import useNavigate
// import PostDetail from '../../user/post_detail/PostDetail';


const AdminHomePage = () => {
  const [bannedPosts, setBannedPosts] = useState([]);
  const [unbannedPosts, setUnbannedPosts] = useState([]);
  const [deletedPosts, setDeletedPosts] = useState([]);
  const navigate = useNavigate(); // Hook for navigation


  const { user1 } = useAuth();
  const toOther= () => {
      navigate('/usermanagement');

  }
  const toMessageManagement= () => {
      navigate('/messages');
  }

  useEffect(() => {
    // Redirect to login if user is not authenticated or not a user
    if (!user1 || user1 !== 'ADMIN') {
      navigate('/login');
    }
  }, [user1, navigate]);


  const navigateToPostDetail = (postId) => {
    navigate(`/post/${postId}`);
  };
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setBannedPosts(await getBannedPosts());
    setUnbannedPosts(await getUnbannedPosts());
    setDeletedPosts(await getDeletedPosts());
  };

  const handleBan = (post) => {
    banPost(post.postId);
  };

  const handleUnban = (post) => {
    recoverPost(post.postId);
  };

  const handleRecover = (post) => {
    recoverPost(post.postId);
  };


  const recoverPost = async (postId) => {
    try {
      const token = localStorage.getItem('Authorization');
      if (!token) {
        throw new Error('No token found');
      };
      const response = await fetch(`http://localhost:10010/posts/publish?postId=${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        loadPosts(); // Refresh all lists to reflect changes
      } else {
        throw new Error('Failed to recover the post');
      }
    } catch (error) {
      console.error('Error recovering the post:', error);
    }
  };
  const banPost = async (postId) => {
    try {
        const token = localStorage.getItem('Authorization');
        if (!token) {
          throw new Error('No token found');
        };
      const response = await fetch(`http://localhost:10010/posts/ban?postId=${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        loadPosts(); // Refresh all lists to reflect changes
      } else {
        throw new Error('Failed to recover the post');
      }
    } catch (error) {
      console.error('Error recovering the post:', error);
    }
};
  

return (
  
    <div className="container mt-3">
        <Button onClick={toOther} className="me-4" >To User Management</Button>
        <Button onClick={toMessageManagement} className="me-4">To Message Management</Button>
      <hr />
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header bg-primary text-white">Banned Posts</div>
            <div className="card-body">
              {bannedPosts.map((post) => (
                <div className="card mb-2" key={post.postId}>
                  <div className="card-body">
                    <PostItem post={post} onUnban={handleUnban} onClick={navigateToPostDetail}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-header bg-warning text-dark">Unbanned Posts</div>
            <div className="card-body">
              {unbannedPosts.map((post) => (
                <div className="card mb-2" key={post.postId}>
                  <div className="card-body">
                    <PostItem post={post} onBan={handleBan} onClick={navigateToPostDetail}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-header bg-success text-white">Deleted Posts</div>
            <div className="card-body">
              {deletedPosts.map((post) => (
                <div className="card mb-2" key={post.postId}>
                  <div className="card-body">
                    <PostItem post={post} onRecover={handleRecover} onClick={navigateToPostDetail}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
