import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsBoxArrowRight } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import Context from "context/Context";
import { useState } from "react";

const TicketBox = ({ i }) => {
  const data = useContext(Context);

  const [info, setInfo] = useState(false);
  const [detail, setDetail] = useState(false);

  // remove ticket
  const removeTicket = (removeID) => {
    const remove = data.getFormDataFromLS
      .filter((i) => i.ticketno != removeID.ticketno)
      .map((i) => {
        return i;
      });
    data.setFilterTickets(remove);
    localStorage.setItem("ticket", JSON.stringify(remove));
  };

  return (
    <ul className="items">
      <div className="index">{i.sort + 1}</div>
      <button
        onMouseOver={() => setInfo(true)}
        onMouseLeave={() => setInfo(false)}
        onClick={() => removeTicket(i)}
        className="delete"
      >
        <AiOutlineDelete />
        <span className={info ? "info active" : "info"}>Ticket sil</span>
      </button>
      <li className="item">
        <h4>Ticketno:</h4>
        <span>{i.ticketno}</span>
      </li>
      <li className="item">
        <h4>Konu:</h4>
        <span>{i.reason.substring(0, 15)}</span>
      </li>
      <li className="item">
        <h4>Durum:</h4>
        <span
          className={
            i.status === data.classStatus.APPROVED
              ? data.classStatus.APPROVE
              : i.status === data.classStatus.WAITING
              ? data.classStatus.WAIT
              : data.classStatus.REJECT
          }
        >
          {i.status.substring(0, 15)}
        </span>
      </li>

      <li className="item">
        <span
          className="ticketDetail"
          onMouseOver={() => setDetail(true)}
          onMouseLeave={() => setDetail(false)}
        >
          <Link to={`/admin/basvuru/${i.ticketno}`}>
            <BsBoxArrowRight />
          </Link>
          <span className={detail ? "info active" : "info"}>Detaya git</span>
        </span>
        <span>{i.today.substring(0, 15)}</span>
      </li>
    </ul>
  );
};

export default TicketBox;
