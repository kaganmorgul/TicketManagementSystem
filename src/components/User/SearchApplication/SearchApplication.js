import React, { useContext, useState } from "react";
import "./SearchApplication.scss";
import Context from "context/Context";
import { useNavigate } from "react-router-dom";

// icons
import { AiOutlineSearch } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";

function SearchApplication() {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const data = useContext(Context);
  const [myTicket, setMyticket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputWidth, setInputWidth] = useState(false);

  const searchInput = (e) => {
    e.preventDefault();
    findTickets(searchVal);
    setSearchVal("");
  };

  const findTickets = (searchVal) => {
    const findItem = data.getFormDataFromLS.find(
      (i) => i.ticketno === parseInt(searchVal),
    );
    setMyticket(findItem);
  };

  const foundTicket = () => (
    myTicket && (
      <ul className="ticketList">
        <li className="item">
          <h3 className="number">{`Ticket No: ${myTicket.ticketno} `}</h3>
          {showTicket()}
        </li>
      </ul>
    )
  );

  const goDetail = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/basvuru/${myTicket.ticketno}`);
    }, 1000);
  };

  const InputWidthSetting = () => {
    let className = "";
    inputWidth
      ? (className = "inputContainer active")
      : (className = "inputContainer");
    return className;
  };

  const showTicket = () => (loading ? (
    <img className="detailLoading" src="../../photos/loading.gif" alt="" />
  ) : (
    <button onClick={goDetail} className="detail">
      <BsBoxArrowUpRight />
    </button>
  ));

  return (
    <div className="ticketSearch">
      <form onSubmit={searchInput} className="form">
        <div className={InputWidthSetting()}>
          <input
            onMouseUp={() => setInputWidth(true)}
            placeholder="Ticket Id"
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="input"
          />
          <button onClick={findTickets} className="button">
            <AiOutlineSearch />
          </button>
        </div>
      </form>
      {foundTicket()}
    </div>
  );
}

export default SearchApplication;
