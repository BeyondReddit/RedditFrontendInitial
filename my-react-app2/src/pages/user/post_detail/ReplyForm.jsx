import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function ReplyForm({ replyType, postId, replyId, onNewRep }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      //   const myBody = JSON.stringify({
      //     postId: postId,
      //     replyId: replyId,
      //     comment: replyContent,
      //   });
      //   console.log(myBody);
      // console.log(replyType);
      const token = localStorage.getItem("token");
      let fetchUrl;
      const REPLY_URL = "http://localhost:8080/posts/reply";
      const SUBREPLY_URL = "http://localhost:8080/posts/subreply";
      if (replyType == "Reply") {
        fetchUrl = REPLY_URL;
      } else {
        fetchUrl = SUBREPLY_URL;
      }
      const response = await fetch(fetchUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          postId: postId,
          replyId: replyId,
          comment: replyContent,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        alert(errorResponse.message);
        throw new Error("Failed to add reply");
      }

      // Refresh post data after successful reply submission
      // You may need to implement a way to refresh post data in your PostPage component
      // window.location.reload();
      onNewRep();
      // Clear the reply input field
      setReplyContent("");
      setShowReplyForm(false);
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };
  return showReplyForm ? (
    <Form onSubmit={handleReplySubmit}>
      <Form.Group controlId="replyContent">
        <Form.Control
          type="text"
          placeholder="Add Your Reply"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
        />
      </Form.Group>
      <Button
        disabled={replyContent.length === 0}
        variant="primary"
        type="submit"
      >
        Submit
      </Button>
      <Button variant="secondary" onClick={() => setShowReplyForm(false)}>
        Cancel
      </Button>
    </Form>
  ) : (
    <Button variant="link" onClick={() => setShowReplyForm(true)}>
      Add {replyType}
    </Button>
  );
}
