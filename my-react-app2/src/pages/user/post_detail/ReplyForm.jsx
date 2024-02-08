import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function ReplyForm({ replyType, postId, replyId }) {
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
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8079/posts/reply", {
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
        console.log(response);
        alert(response.message);
        throw new Error("Failed to add reply");
      }

      // Refresh post data after successful reply submission
      // You may need to implement a way to refresh post data in your PostPage component
      window.location.reload();
      // Clear the reply input field
      setReplyContent("");
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
