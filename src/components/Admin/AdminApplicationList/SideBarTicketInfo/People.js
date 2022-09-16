import React from "react";
import { useContext, useState } from "react";
import Context from "context/Context";
import { Link } from "react-router-dom";
import { BiUpArrowCircle, BiDownArrowCircle } from "react-icons/bi";

import "./People.scss";
const People = () => {
  const data = useContext(Context);
  const [openInfos, setOpenInfos] = useState(false);
  return (
    <>
      <button onClick={() => setOpenInfos(!openInfos)}>
        <span>{openInfos ? <BiDownArrowCircle /> : <BiUpArrowCircle />}</span>
        Ticket Kişi Listesi
        {data.getFormDataFromLS.length > 0 && (
          <small>{data.getFormDataFromLS.length}</small>
        )}
      </button>
      <ul className={openInfos ? "collapseInfo active" : "collapseInfo"}>
        {data.getFormDataFromLS.map((i) => {
          return (
            <Link key={i.ticketno} to={`/admin/basvuru/${i.ticketno}`}>
              <li className="collapsePeopleInfo">
                <img src={i.photo} alt="" />
                <p>{`${i.firstname} ${i.lastname}`}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default People;
