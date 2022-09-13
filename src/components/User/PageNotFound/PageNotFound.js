import React from "react";
import "./PageNotFound.scss";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="pageNotFound">
      <div className="pageNotFoundBox">
        <h1>404</h1>
        <p>Page Not Found !</p>
        <button>
          <Link to="/">Home</Link>
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
