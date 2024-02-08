import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function EditModal({ postId, title, content, onCloseShow, show, onNewRep }) {
  const [postTitle, setPostTitle] = useState(title);
  const [postContent, setPostContent] = useState(content);

  const handleSaveChanges = async () => {
    // Call the savePost endpoint to update the post
    const requestBody = {
      title: postTitle,
      content: postContent,
    };

    // console.log(requestBody);

    try {
      const token = localStorage.getItem("Authorization");
      const response = await fetch(
        `http://localhost:10010/posts/edit?postId=${postId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        // console.log("Post updated successfully");
        onNewRep();
      } else {
        console.error("Failed to update post");
        const responseData = await response.json();
        alert(responseData.message);
      }
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onCloseShow}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="postTitle">
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseShow}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSaveChanges().then(onCloseShow)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
