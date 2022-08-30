import React, { useContext, useState } from "react";
import "../../sass/pages/BasvuruSorgula.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";
import FormContext from "../../context/FormValContext";
import GeneralContext from "../../context/GeneralContext";
import { useNavigate } from "react-router-dom";

function BasvuruSorgula() {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const data = useContext(FormContext);
  const generalData = useContext(GeneralContext);
  const [myTicket, setMyticket] = useState("");
  const [loading, setLoading] = useState(false);

  const searchInput = (e) => {
    e.preventDefault();
    findTickets(searchVal);
    setSearchVal("");
  };
  const findTickets = (searchVal) => {
    const findItem = data.getFormDataFromLS.find(
      (i) => i.ticketno === parseInt(searchVal)
    );
    setMyticket(findItem);
  };
  const goDetail = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/basvuru/${myTicket.ticketno}`);
    }, 1000);
  };

  return (
    <div className="BasvuruSorgu">
      <form onSubmit={searchInput} className="BasvuruSorgu__form">
        <div
          className={
            generalData.inputWith
              ? "BasvuruSorgu__form__container active"
              : "BasvuruSorgu__form__container"
          }
        >
          <input
            onMouseUp={() => generalData.setInputWidth(true)}
            placeholder="Ticket Id"
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="BasvuruSorgu__form__container-input"
          ></input>
          <button
            onClick={findTickets}
            className="BasvuruSorgu__form__container-button"
          >
            <AiOutlineSearch />
          </button>
        </div>
      </form>
      {myTicket && (
        <ul className="BasvuruSorguList">
          <li className="BasvuruSorguList-item">
            <h3 className="BasvuruSorguList-item-no">{`Ticket No: ${myTicket.ticketno} `}</h3>
            {loading ? (
              <img
                className="detailloading"
                src="../../photos/loading.gif"
                alt=""
              />
            ) : (
              <button
                onClick={goDetail}
                className="BasvuruSorguList-item-detail"
              >
                <BsBoxArrowUpRight />
              </button>
            )}
          </li>
        </ul>
      )}
    </div>
  );
}

export default BasvuruSorgula;
