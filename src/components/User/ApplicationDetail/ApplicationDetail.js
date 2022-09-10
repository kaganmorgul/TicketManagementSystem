import React from "react";
import "./ApplicationDetail.scss";
import { useContext } from "react";
import Context from "context/Context";
import { useParams, useNavigate } from "react-router-dom";
import DetailsItem from "./DetailsItem";
import PageNotFound from "../PageNotFound/PageNotFound";
// icons
import { AiOutlineRollback } from "react-icons/ai";
import { GoQuote } from "react-icons/go";

const ApplicationDetail = () => {
  const navigate = useNavigate();
  const data = useContext(Context);
  const { id } = useParams();

  // get Data from LS
  const ticket = data.getFormDataFromLS.find(
    (i) => i.ticketno === parseInt(id)
  );

  // backToPreviousPage
  const backToPreviousPage = () => navigate("../", { replace: true });

  return ticket ? (
    <div className="applicationDetail">
      <h1 className="title">{`${ticket.ticketno}'Nolu Ticket Detayı`}</h1>
      <div className="cardDetail">
        <ul className="list">
          <span className="icon">
            <GoQuote />
          </span>
          <div className="photo">
            <img src={ticket.photo} alt="" />
          </div>
          <DetailsItem ticket={ticket} />0 0{" "}
          <button onClick={backToPreviousPage} className={"backicon"}>
            <AiOutlineRollback />
          </button>
        </ul>
      </div>
    </div>
  ) : (
    <PageNotFound />
  );
};

export default ApplicationDetail;
