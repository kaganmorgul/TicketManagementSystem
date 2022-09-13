import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Context from "context/Context";
import "./AdminApplicationList.scss";

// icons
import { BiTime } from "react-icons/bi";
import {
  AiOutlineSearch,
  AiOutlineCheckCircle,
  AiOutlineUnorderedList,
  AiOutlineStar,
  AiOutlineDelete,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { BsBoxArrowRight } from "react-icons/bs";

function AdminTicketList() {
  const data = useContext(Context);

  //   const [selectedCategory, setSelectedCategory] = useState("Hepsi");

  const [searchId, setSearchId] = useState("");

  const filterButtons = [
    {
      id: 1,
      val: data.ticketno,
      name: "onaylandı",
      icon: <AiOutlineCheckCircle />,
    },
    {
      id: 2,
      val: data.ticketno,
      name: "onay bekliyor",
      icon: <BiTime />,
    },
    {
      id: 3,
      val: data.ticketno,
      name: "reddedildi",
      icon: <TiDeleteOutline />,
    },
  ];
  const filterTicket = (filterStatus) => {
    const filteredTicket = data.getFormDataFromLS.filter(
      (i) => i.status === filterStatus
    );
    // setSelectedCategory(filterStatus);
    data.setFilterTickets(filteredTicket);
  };

  // show all tickets
  const showAll = () => {
    data.setFilterTickets(data.getFormDataFromLS);
    // setSelectedCategory("Hepsi");
  };

  // filter favorite tickets
  const filterFav = () => {
    const favs = data.getFormDataFromLS.filter((i) => i.favorite === true);
    data.setFilterTickets(favs);
    // setSelectedCategory("Favori");
  };

  // ticket count
  const ticketCount = (category) => {
    const a = data.getFormDataFromLS.filter((i) => i.status === category);
    return <p>{a.length}</p>;
  };

  // favorite ticket count
  const ticketFavCount = () => {
    const a = data.getFormDataFromLS.filter((i) => i.favorite === true);
    return <p>{a.length}</p>;
  };

  // filter buttons map function
  const writeFilterButton = () => {
    const buttons = filterButtons.map((filterButton) => (
      <button
        key={filterButton.id}
        className="item"
        onClick={() => filterTicket(filterButton.name)}
      >
        <span>{filterButton.icon}</span>
        {filterButton.name}
        <span className="count">{ticketCount(filterButton.name)}</span>
      </button>
    ));
    return buttons;
  };

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

  // Admin ticket search
  const searchTicket = () => {
    const search = data.filterTickets
      .filter((i) =>
        searchId === ""
          ? i
          : i.reason
              .toLocaleLowerCase()
              .trim()
              .includes(searchId.toLocaleLowerCase().trim())
      )
      .map((i) => data.filterTickets && ticketBox(i));
    return search;
  };

  const ticketBox = (i) => {
    return (
      <ul className="items">
        <button onClick={() => removeTicket(i)} className="delete">
          <AiOutlineDelete />
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
          <span>
            <Link to={`/admin/basvuru/${i.ticketno}`}>
              <BsBoxArrowRight />
            </Link>
          </span>
          <span>{i.today.substring(0, 15)}</span>
        </li>
      </ul>
    );
  };

  return (
    <div className="adminTicketListPage">
      <div className="filterButtons">
        <button className="item" onClick={showAll}>
          <span>
            <AiOutlineUnorderedList />
          </span>
          Hepsi
          <span className="count">{data.getFormDataFromLS.length}</span>
        </button>
        {writeFilterButton()}
        <button className="item" onClick={filterFav}>
          <span>
            <AiOutlineStar />
          </span>
          Favoriler
          <span className="count">{ticketFavCount()}</span>
        </button>
      </div>
      <div className="adminSearchArea">
        <div className="input">
          <input
            type="text"
            placeholder="Enter issue"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button>
            <AiOutlineSearch />
          </button>
        </div>
      </div>
      {/* <h3 className="categoryTitle">{selectedCategory}</h3> */}
      <div className="adminTicketList">{searchTicket()}</div>
    </div>
  );
}

export default AdminTicketList;
