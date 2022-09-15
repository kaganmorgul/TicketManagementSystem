import React from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Context from "context/Context";
import { BiUpArrowCircle, BiDownArrowCircle } from "react-icons/bi";
import { BsBoxArrowRight } from "react-icons/bs";
import "./Today.scss";
const People = () => {
  const data = useContext(Context);
  const [openInfos, setOpenInfos] = useState(false);

  const todayTicketControl = () => {
    const list = data.getFormDataFromLS
      .filter((i) => i.today === data.today)
      .map((i) => {
        return (
          <li className="collapseTicketInfo" key={i.ticketno}>
            <p>{i.ticketno}</p>
            <Link to={`/admin/basvuru/${i.ticketno}`}>
              <BsBoxArrowRight />
            </Link>
          </li>
        );
      });
    return list;
  };

  return (
    <>
      <button onClick={() => setOpenInfos(!openInfos)}>
        <span>{openInfos ? <BiDownArrowCircle /> : <BiUpArrowCircle />}</span>
        <p> Bugün Gönderilenler</p>
        <small>{todayTicketControl().length}</small>
      </button>
      {todayTicketControl().length > 1 ? (
        <ul className={openInfos ? "collapseInfo active" : "collapseInfo"}>
          {todayTicketControl()}
        </ul>
      ) : (
        <p className="noTicketMessage">{"Henüz Ticket Gönderilmemiş"}</p>
      )}
    </>
  );
};

export default People;
