import React from "react";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="container">
      <h1 className="title">404 Not Found</h1>
      <p className="message">
        Sorry, the page you are looking for might be in another castle.
      </p>
    </div>
  );
};

export default NotFound;
