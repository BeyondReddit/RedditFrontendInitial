import React from 'react';

const PostItem = ({ post, onBan, onUnban, onRecover, onClick }) => {
  // Using the correct property names from the response data
  const handleBanClick = (event, post) => {
    event.stopPropagation();
    onBan(post);
  };

  const handleUnbanClick = (event, post) => {
    event.stopPropagation();
    onUnban(post);
  };

  const handleRecoverClick = (event, post) => {
    event.stopPropagation();
    onRecover(post);
  };
  return (
    <div className="post-item" onClick={() => onClick(post.postId)}>
      <h3>{post.title}</h3>
      <p>Post ID: {post.postId}</p> 
      <p>Date Created: {new Date(post.dateCreated).toLocaleDateString()}</p>

      {onBan && <button onClick={(event) => handleBanClick(event, post)}>Ban</button>}
      {onUnban && <button onClick={(event) => handleUnbanClick(event, post)}>Unban</button>}
      {onRecover && <button onClick={(event) => handleRecoverClick(event, post)}>Recover</button>}


    </div>
  );
};

export default PostItem;
