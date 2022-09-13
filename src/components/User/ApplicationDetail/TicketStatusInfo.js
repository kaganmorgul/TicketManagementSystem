import React from "react";
import "./TicketStatusInfo.scss";
import { AiFillPushpin } from "react-icons/ai";

function TicketStatusInfo() {
  return (
    <div className="ticketStatusInfo">
      <span className="icon">
        <AiFillPushpin />
      </span>
      <ul>
        <li>
          <div className="approve"> </div>
          <p>Onaylandı</p>
        </li>
        <li>
          <div className="pending"> </div>
          <p>Onay Bekliyor</p>
        </li>
        <li>
          <div className="reject"> </div>
          <p>Reddedildi</p>
        </li>
      </ul>
    </div>
  );
}

export default TicketStatusInfo;
