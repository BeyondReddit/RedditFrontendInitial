import React from 'react';

const PostItem = ({ post, onBan, onUnban, onRecover, onArchive, onHide, onDelete, onClick }) => {
  // Using the correct property names from the response data
  return (
    <div className="post-item" onClick={() => onClick(post.postId)}>
      <h3>{post.title}</h3>
      <p>Post ID: {post.postId}</p> 
      <p>Date Created: {new Date(post.dateCreated).toLocaleDateString()}</p>

      {/* Use onBan, onUnban, onRecover as needed based on where you are using this component */}
      {onBan && <button onClick={() => onBan(post)}>Ban</button>}
      {onUnban && <button onClick={() => onUnban(post)}>Unban</button>}
      {onRecover && <button onClick={() => onRecover(post)}>Recover</button>}
      {onArchive && <button onClick={() => onArchive(post)}>Archive</button>}
      {onHide && <button onClick={() => onHide(post)}>Hide</button>}
      {onDelete && <button onClick={() => onDelete(post)}>Delete</button>}
    </div>
  );
};

export default PostItem;
