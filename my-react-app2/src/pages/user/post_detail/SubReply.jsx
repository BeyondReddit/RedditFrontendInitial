// Subreply.js
import React from "react";

function Subreply({ subreply }) {
  const infoStyles = {
    color: "grey",
    fontSize: "10px",
  };
  return (
    <>
      <div style={infoStyles}>
        Posted by User {subreply.userId} on{" "}
        {new Date(subreply.dateCreated).toLocaleDateString()}
      </div>
      <li>{subreply.comment}</li>
    </>
  );
}

export default Subreply;
