import React from "react";
import Today from "./Today";
import People from "./People";
import "./SideBarInfo.scss";
const SideBarInfo = () => {
  return (
    <>
      <ul className="rightSideCollapse">
        <li>
          <People />
        </li>
        <li>
          <Today />
        </li>
      </ul>
    </>
  );
};

export default SideBarInfo;
