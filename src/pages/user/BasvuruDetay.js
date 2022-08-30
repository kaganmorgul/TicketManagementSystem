import React from "react";
import "../../sass/pages/BasvuruDetay.scss";
import { useContext } from "react";
import FormContext from "../../context/FormValContext";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineRollback } from "react-icons/ai";
import { GoQuote } from "react-icons/go";

function BasvuruDetay() {
  const navigate = useNavigate();
  const data = useContext(FormContext);
  let { id } = useParams();
  const ticket = data.getFormDataFromLS.find(
    (i) => i.ticketno === parseInt(id)
  );
  return (
    <div className="BasvuruDetay">
      <h1 className="BasvuruDetay-title">{`${ticket.ticketno}'Nolu Ticket Detayı`}</h1>
      <div className="BasvuruDetay__form">
        <ul className="BasvuruDetay__form__list">
          <span className="BasvuruDetay__form__list-icon">
            <GoQuote />
          </span>
          <div className="BasvuruDetay__form__list-photo">
            <img src={ticket.photo} alt=""></img>
          </div>
          <li className="BasvuruDetay__form__list-item">
            <p>
              <h2>{"İsim:"}</h2>
              <span>{ticket.firstname}</span>
            </p>
          </li>
          <li className="BasvuruDetay__form__list-item">
            <p>
              <h2>{"Soyisim:"}</h2>
              <span>{ticket.lastname}</span>
            </p>
          </li>
          <li className="BasvuruDetay__form__list-item">
            <p>
              <h2>{"TC Kimlik No:"}</h2>
              <span>{ticket.id}</span>
            </p>
          </li>
          <li className="BasvuruDetay__form__list-item">
            <p>
              <h2>{"Ticket No:"}</h2>
              <span>{ticket.ticketno}</span>
            </p>
          </li>
          <li className="BasvuruDetay__form__list-item">
            <p>
              <h2>{"Adres:"}</h2>
              <span>{`${ticket.address.substring(0, 20)}...`}</span>
            </p>
          </li>
          <li className="BasvuruDetay__form__list-item">
            <p>
              <h2>{"Konu:"}</h2>
              <span>{`${ticket.reason.substring(0, 10)}...`}</span>
            </p>
          </li>
          <li className="BasvuruDetay__form__list-item">
            <p>
              <h2>{"Tarih:"}</h2>
              <span>{ticket.today}</span>
            </p>
          </li>
          <li className="BasvuruDetay__form__list-item">
            <p>
              <h2>{"Status:"}</h2>
              <span
                className={
                  ticket.status === "onaylandı"
                    ? "onay"
                    : ticket.status === "onay bekliyor"
                    ? "wait"
                    : "red"
                }
              >
                {ticket.status}
              </span>
            </p>
          </li>
          <li className="BasvuruDetay__form__list-item">
            <p>
              <h2>{"Admin Yorumu:"}</h2>
              <span>{ticket.comment}</span>
            </p>
          </li>
          <button
            onClick={() => navigate("../", { replace: true })}
            className={"BasvuruDetay-backicon"}
          >
            {/* <Link to="/admin/basvuru-listesi"> */}
            <AiOutlineRollback />
            {/* </Link> */}
          </button>
        </ul>
      </div>
    </div>
  );
}

export default BasvuruDetay;
