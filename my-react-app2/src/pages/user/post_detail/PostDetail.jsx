import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PostReply from "./PostReply";
import { useParams } from "react-router-dom";
import ReplyForm from "./ReplyForm";
import EditModal from "./EditModal";

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [show, setShow] = useState(false);
  const [userName, setUsername] = useState(null);
  const [newRep, SetNewRep] = useState(false);
  // const [owner, SetOwner] = useState(false);

  const infoStyles = {
    color: "grey",
    fontSize: "10px",
  };
  const handleNewRep = () => {
    SetNewRep(!newRep);
  };

  const toggleArchive = async (isArchived) => {
    let requestURL = `http://localhost:10010/posts/archive?postId=${postId}`;
    // let requestURL = ;
    if (isArchived) {
      requestURL = `http://localhost:10010/posts/unarchive?postId=${postId}`;
    }
    const token = localStorage.getItem("Authorization");
    const response = await fetch(requestURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Attach the token to the request header
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      alert(errorResponse.message);
      throw new Error("Failed");
    } else {
      handleNewRep();
    }
    // console.log(requestURL);
  };

  const deletePost = async (isArchived) => {
    const requestURL = `http://localhost:10010/posts/delete?postId=${postId}`;
    const token = localStorage.getItem("Authorization");
    const response = await fetch(requestURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Attach the token to the request header
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      alert(errorResponse.message);
      throw new Error("Failed");
    } else {
      handleNewRep();
    }
    // console.log(requestURL);
  };

  const toggleHidePost = async (isHidden) => {
    let requestURL = `http://localhost:10010/posts/hide?postId=${postId}`;
    if (isHidden) {
      requestURL = `http://localhost:10010/posts/publish?postId=${postId}`;
    }
    const token = localStorage.getItem("Authorization");
    const response = await fetch(requestURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Attach the token to the request header
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      alert(errorResponse.message);
      throw new Error("Failed");
    } else {
      handleNewRep();
    }
    // console.log(requestURL);
  };

  const handleShow = () => {
    // Fetch the post data when the modal is opened
    setShow(true);
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    fetchPost();
  }, [newRep]);

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      const response = await fetch(
        `http://localhost:10010/posts?postId=${postId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Attach the token to the request header
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const postData = await response.json();
      const userResponse = await fetch(
        `http://localhost:10010/users/getUserOnlyById/${postData.data.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Attach the token to the request header
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = await userResponse.json();
      setUsername(userData.firstName + " " + userData.lastName);
      setPost(postData.data);
      // console.log(post);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          {post ? (
            <>
              <EditModal
                show={show}
                title={post.title}
                content={post.content}
                onCloseShow={handleClose}
                postId={post.postId}
                onNewRep={handleNewRep}
              />
              <Card>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  {/* <Card.Subtitle className="mb-2 text-muted">
                  Author: User {post.userId}
                </Card.Subtitle> */}
                  <Card.Subtitle className="mb-2 text-muted">
                    Author Name: {userName}
                  </Card.Subtitle>
                  {post.archived && (
                    <Card.Text className="text-warning">Archived</Card.Text>
                  )}
                  <Button onClick={() => toggleArchive(post.archived)}>
                    {post.archived ? "Resume Post" : "Archive Post"}
                  </Button>
                  {post.status !== "DELETED" && (
                    <Button onClick={() => deletePost}>Delete Post</Button>
                  )}
                  {post.status !== "HIDDEN" && (
                    <Button onClick={() => toggleHidePost(false)}>
                      Hide Post
                    </Button>
                  )}
                  {post.status == "HIDDEN" && (
                    <Button onClick={() => toggleHidePost(true)}>
                      Open Post
                    </Button>
                  )}
                  <Card.Text className="text-muted" style={infoStyles}>
                    Date Created: {new Date(post.dateCreated).toLocaleString()}
                  </Card.Text>
                  <Card.Text className="text-muted" style={infoStyles}>
                    Date Modified:{" "}
                    {new Date(post.dateModified).toLocaleString()}
                  </Card.Text>
                  <Card.Text>{post.content}</Card.Text>
                  {post.images && (
                    <ul>
                      {post.images.map((image, index) => (
                        <li key={index}>
                          <Card.Img src={image} alt={`Image ${index + 1}`} />
                        </li>
                      ))}
                    </ul>
                  )}
                  <h5>Attachments:</h5>
                  <ul>
                    {post.attachments &&
                      post.attachments.map((attachment, index) => (
                        <li key={index}>
                          <a
                            href={attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {attachment}
                          </a>
                        </li>
                      ))}
                  </ul>
                  <Button
                    variant="primary"
                    className="mb-2"
                    onClick={handleShow}
                  >
                    Edit Post
                  </Button>
                  <hr />
                  <h5>Replies:</h5>
                  <ul>
                    {post.postReplies &&
                      post.postReplies.map((reply, index) => (
                        <PostReply
                          key={index}
                          postId={postId}
                          reply={reply}
                          onNewRep={handleNewRep}
                          isArchived={post.archived}
                        />
                      ))}
                  </ul>
                  {!post.archived && (
                    <ReplyForm
                      replyType="Reply"
                      postId={postId}
                      onNewRep={handleNewRep}
                    />
                  )}
                </Card.Body>
              </Card>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PostDetail;
