import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import PostReply from "./PostReply";
import { useParams } from "react-router-dom";
import ReplyForm from "./ReplyForm";

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [userName, setUsername] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);
  
  const fetchPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8079/posts?postId=${postId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Attach the token to the request header
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const response = await fetch();
      const postData = await response.json();
      //   const userResponse = await fetch(
      //     `http://localhost:8083/users/getUserOnlyById/${postData.data.userId}`,
      //     {
      //       method: "GET",
      //       headers: {
      //         "Content-Type": "application/json",
      //         // Attach the token to the request header
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );
      //   const userData = await userResponse.json();
      //   setUsername(userData.firstName + " " + userData.lastName);
      setPost(postData.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          {post ? (
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">
                  Author: User {post.userId}
                </Card.Subtitle> */}
                <Card.Subtitle className="mb-2 text-muted">
                  Author Name: {userName}
                </Card.Subtitle>
                <Card.Text className="text-muted">
                  Date Created: {new Date(post.dateCreated).toLocaleString()}
                </Card.Text>
                <Card.Text className="text-muted">
                  Date Modified: {new Date(post.dateModified).toLocaleString()}
                </Card.Text>
                <Card.Text>{post.content}</Card.Text>
                <ul>
                  {post.images.map((image, index) => (
                    <li key={index}>
                      <Card.Img src={image} alt={`Image ${index + 1}`} />
                    </li>
                  ))}
                </ul>
                <h5>Attachments:</h5>
                <ul>
                  {post.attachments.map((attachment, index) => (
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
                <hr />
                <h5>Replies:</h5>
                <ul>
                  {post.postReplies.map((reply, index) => (
                    <PostReply key={index} reply={reply} />
                  ))}
                </ul>
                <ReplyForm replyType="Reply" postId={postId} />
              </Card.Body>
            </Card>
          ) : (
            <p>Loading...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PostDetail;
