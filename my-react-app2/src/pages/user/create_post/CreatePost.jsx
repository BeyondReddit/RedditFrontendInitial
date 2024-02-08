import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    // console.log(files);
    setImages(files);
  };

  const handleAttachmentUpload = (event) => {
    const files = Array.from(event.target.files);
    setAttachments(files);
  };

  const uploadFile = async (file) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:10010/files/upload", {
      method: "POST",
      Authorization: `Bearer ${token}`,
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to upload file");
    }
    const data = await response.json();
    return data.fileUri;
  };

  const handleSubmit = async () => {
    console.log("You clicked submit!");
    try {
      const imageResponses = await Promise.all(images.map(uploadFile));
      const attachmentResponses = await Promise.all(
        attachments.map(uploadFile)
      );
      const postData = {
        title: title,
        content: content,
        images: imageResponses,
        attachments: attachmentResponses,
      };
      console.log(postData);
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:10010/posts/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Attach the token to the request header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw responseData.message;
      }
    } catch (e) {
      alert(e);
      // Revert uploads if one of the files fails
      // await Promise.all(files.map(async (file) => {
      //   await deleteFile(file.name);
      // }));
      // throw error;
    }
  };

  return (
    <>
      <Form>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formImages">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control type="file" multiple onChange={handleImageUpload} />
        </Form.Group>
        <Form.Group controlId="formAttachments">
          <Form.Label>Upload Attachments</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleAttachmentUpload}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CreatePost;
