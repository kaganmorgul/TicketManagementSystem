import React from "react";

const DetailsItem = ({ ticket }) => {
  // ticket status class vals
  const classStatus = {
    APPROVED: "onaylandı",
    WAITING: "onay bekliyor",
    APPROVE: "onay",
    WAIT: "wait",
    REJECT: "red",
  };

  // ticket status ClassName
  const ticketStatus = () => {
    let className = "";
    ticket.status === classStatus.APPROVED
      ? (className = classStatus.APPROVE)
      : ticket.status === classStatus.WAITING
      ? (className = classStatus.WAIT)
      : (className = classStatus.REJECT);

    return className;
  };

  return (
    <>
      <li className="item">
        <p>
          <h2>{"İsim:"}</h2>
          <span>{ticket.firstname}</span>
        </p>
      </li>
      <li className="item">
        <p>
          <h2>{"Soyisim:"}</h2>
          <span>{ticket.lastname}</span>
        </p>
      </li>
      <li className="item">
        <p>
          <h2>{"TC Kimlik No:"}</h2>
          <span>{ticket.id}</span>
        </p>
      </li>
      <li className="item">
        <p>
          <h2>{"Ticket No:"}</h2>
          <span>{ticket.ticketno}</span>
        </p>
      </li>
      <li className="item">
        <p>
          <h2>{"Adres:"}</h2>
          <span>{`${ticket.address.substring(0, 20)}...`}</span>
        </p>
      </li>
      <li className="item">
        <p>
          <h2>{"Konu:"}</h2>
          <span>{`${ticket.reason.substring(0, 10)}...`}</span>
        </p>
      </li>
      <li className="item">
        <p>
          <h2>{"Tarih:"}</h2>
          <span>{ticket.today}</span>
        </p>
      </li>
      <li className="item">
        <p>
          <h2>{"Status:"}</h2>
          <span className={ticketStatus()}>{ticket.status}</span>
        </p>
      </li>
      <li className="item">
        <p>
          <h2>{"Admin Yorumu:"}</h2>
          <span>{ticket.comment}</span>
        </p>
      </li>
    </>
  );
};

export default DetailsItem;
