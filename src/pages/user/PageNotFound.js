import React from "react";
import "../../sass/pages/PageNotFound.scss";
import { Link } from "react-router-dom";

function PageNotFound() {
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
}

export default PageNotFound;
