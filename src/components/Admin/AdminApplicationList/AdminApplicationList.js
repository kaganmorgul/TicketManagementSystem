import React, { useContext, useState } from "react";
import Context from "context/Context";
import "./AdminApplicationList.scss";
import TicketBox from "./TicketBox";

// icons
import { BiTime } from "react-icons/bi";
import {
  AiOutlineSearch,
  AiOutlineCheckCircle,
  AiOutlineUnorderedList,
  AiOutlineStar,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

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
      .map((i) => data.filterTickets && <TicketBox i={i} />);
    return search;
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
