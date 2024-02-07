import React, { useState, useEffect } from 'react';
import PostItem from '../../../components/PostItem/PostItem';
import { getBannedPosts, getUnbannedPosts, getDeletedPosts } from './adminHomePageLogic';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS


const AdminHomePage = () => {
  const [bannedPosts, setBannedPosts] = useState([]);
  const [unbannedPosts, setUnbannedPosts] = useState([]);
  const [deletedPosts, setDeletedPosts] = useState([]);

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
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('No token found');
      };
      const response = await fetch(`http://localhost:8079/posts/publish?postId=${postId}`, {
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
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          throw new Error('No token found');
        };
      const response = await fetch(`http://localhost:8079/posts/ban?postId=${postId}`, {
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
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header bg-primary text-white">Banned Posts</div>
            <div className="card-body">
              {bannedPosts.map((post) => (
                <div className="card mb-2" key={post.postId}>
                  <div className="card-body">
                    <PostItem post={post} onUnban={handleUnban} />
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
                    <PostItem post={post} onBan={handleBan} />
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
                    <PostItem post={post} onRecover={handleRecover} />
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
