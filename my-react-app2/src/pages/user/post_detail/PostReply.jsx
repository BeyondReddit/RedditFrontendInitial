// PostReply.js

import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Subreply from "./SubReply";
import ReplyForm from "./ReplyForm";

function PostReply({ reply }) {
  const infoStyles = {
    color: "grey",
    fontSize: "10px",
  };

  //   const contentStyles = {
  //     color: "black",
  //     fontSize: "20px",
  //   };

  return (
    <Card>
      <Card.Body>
        <div style={infoStyles}>
          Posted by User {reply.userId} on{" "}
          {new Date(reply.dateCreated).toLocaleDateString()}
        </div>
        <Card.Text>{reply.comment}</Card.Text>
        <ul>
          {reply.subReplies.map((subreply, index) => (
            <Subreply key={subreply.replyId} subreply={subreply} />
          ))}
        </ul>
        <ReplyForm replyType="Subreply" />
      </Card.Body>
    </Card>
  );
}

export default PostReply;
