import React, { useContext, useState } from "react";
import Context from "context/Context";
import "./AdminApplicationList.scss";
import TicketBox from "./TicketBox";
import SideBarInfo from "./SideBarTicketInfo/SideBarInfo";

// icons
import { BiTime } from "react-icons/bi";
import {
  AiOutlineSearch,
  AiOutlineCheckCircle,
  AiOutlineUnorderedList,
  AiOutlineStar,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

function AdminTicketList() {
  const data = useContext(Context);

  const [searchId, setSearchId] = useState("");

  const [rightSideShow, setRightSideShow] = useState(false);

  const [sortButton, setSortButton] = useState("1-9");
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
    let count = a.length;
    return count;
  };

  // favorite ticket count
  const ticketFavCount = () => {
    const a = data.getFormDataFromLS.filter((i) => i.favorite === true);
    let count = a.length;
    return count;
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
        {ticketCount(filterButton.name) > 0 && (
          <span className="count">{ticketCount(filterButton.name)}</span>
        )}
      </button>
    ));
    return buttons;
  };

  // Admin ticket search
  const searchTicketStraight = () => {
    const search = data.filterTickets
      .filter((i) =>
        searchId === ""
          ? i
          : i.reason
              .toLocaleLowerCase()
              .trim()
              .includes(searchId.toLocaleLowerCase().trim())
      )
      .sort((a, b) => a.sort - b.sort)
      .map(
        (i, index) =>
          data.filterTickets && (
            <TicketBox key={i.ticketno} index={index} i={i} />
          )
      );
    return search;
  };
  const searchTicketReverse = () => {
    const search = data.filterTickets
      .filter((i) =>
        searchId === ""
          ? i
          : i.reason
              .toLocaleLowerCase()
              .trim()
              .includes(searchId.toLocaleLowerCase().trim())
      )
      .sort((a, b) => b.sort - a.sort)
      .map(
        (i, index) =>
          data.filterTickets && (
            <TicketBox key={i.ticketno} index={index} i={i} />
          )
      );
    return search;
  };
  const searchTicketNameStraight = () => {
    const search = data.filterTickets
      .filter((i) =>
        searchId === ""
          ? i
          : i.reason
              .toLocaleLowerCase()
              .trim()
              .includes(searchId.toLocaleLowerCase().trim())
      )
      .sort((a, b) => (a.firstname > b.firstname ? 1 : -1))
      .map(
        (i, index) =>
          data.filterTickets && (
            <TicketBox key={i.ticketno} index={index} i={i} />
          )
      );
    return search;
  };
  const searchTicketNameReverse = () => {
    const search = data.filterTickets
      .filter((i) =>
        searchId === ""
          ? i
          : i.reason
              .toLocaleLowerCase()
              .trim()
              .includes(searchId.toLocaleLowerCase().trim())
      )
      .sort((a, b) => (b.firstname > a.firstname ? 1 : -1))
      .map(
        (i, index) =>
          data.filterTickets && (
            <TicketBox key={i.ticketno} index={index} i={i} />
          )
      );
    return search;
  };
  const resultOfSearch = () => {
    return (
      searchId.length > 0 &&
      (searchTicketStraight().length === 0 ? (
        <h3 className="searchReasultInfo">
          {"Bu başlık ile ilgili sonuç bulunamadı.. "}
        </h3>
      ) : (
        <h3 className="searchReasultInfo">{`Bu başlık ile ilgili ${
          searchTicketStraight().length
        } sonuç bulundu.. `}</h3>
      ))
    );
  };

  return (
    <div className="adminTicketListPage">
      <button
        onClick={() => {
          setRightSideShow(!rightSideShow);
        }}
        className="openRightSideIcon"
      >
        <AiOutlineMenuFold />
      </button>
      <div className="leftSide">
        <div className="filterButtons">
          <button className="item" onClick={showAll}>
            <span>
              <AiOutlineUnorderedList />
            </span>
            Hepsi
            {data.getFormDataFromLS.length > 0 && (
              <span className="count">{data.getFormDataFromLS.length}</span>
            )}
          </button>
          {writeFilterButton()}
          <button className="item" onClick={filterFav}>
            <span>
              <AiOutlineStar />
            </span>
            Favoriler
            {ticketFavCount() > 0 && (
              <span className="count">{ticketFavCount()}</span>
            )}
          </button>
        </div>
        <div className="adminSearchArea">
          {/* <div className="sort" onClick={() => setSortButton(!sortButton)}>
            <TbArrowsUpDown />
          </div> */}
          <select
            className="selectBox"
            value={sortButton}
            onChange={(e) => setSortButton(e.target.value)}
          >
            <option value={"1-9"}>1-9</option>
            <option value={"9-1"}>9-1</option>
            <option value={"a-z"}>a-z</option>
            <option value={"z-a"}>z-a</option>
          </select>
          <div className="input">
            <input
              type="text"
              placeholder="Konu"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button>
              <AiOutlineSearch />
            </button>
          </div>
        </div>
        {resultOfSearch()}
        <div className="adminTicketList">
          {sortButton === "1-9"
            ? searchTicketStraight()
            : sortButton === "9-1"
            ? searchTicketReverse()
            : sortButton === "a-z"
            ? searchTicketNameStraight()
            : sortButton === "z-a"
            ? searchTicketNameReverse()
            : false}
        </div>
      </div>

      <div className={rightSideShow ? "rightSide active" : "rightSide"}>
        <button
          onClick={() => {
            setRightSideShow(!rightSideShow);
          }}
          className="closeRightSideIcon"
        >
          <AiOutlineMenuUnfold />
        </button>
        <SideBarInfo />
      </div>
    </div>
  );
}

export default AdminTicketList;
