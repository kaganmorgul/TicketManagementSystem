import React from "react";
import "./PageNotFound.scss";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="PageNotFound">
      <div className="PageNotFound-text">
        404 Page Not Found
        <h3>
          <Link to="/">Go Home</Link>
        </h3>
      </div>
    </div>
  );
};

export default PageNotFound;
