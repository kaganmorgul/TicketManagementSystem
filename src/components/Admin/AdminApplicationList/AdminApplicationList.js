import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Context from "context/Context";
import "./AdminApplicationList.scss";

// icons
import { BiTime } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import {
  AiOutlineCheckCircle,
  AiOutlineUnorderedList,
  AiOutlineStar,
} from "react-icons/ai";
import { BsBoxArrowRight } from "react-icons/bs";

const AdminBasvuruListesi = () => {
  const data = useContext(Context);

  const [filterTickets, setFilterTickets] = useState(data.getFormDataFromLS);

  const [selectedCategory, setSelectedCategory] = useState("Hepsi");

  const [searchId, setSearchId] = useState("");

  const classStatus = {
    APPROVED: "onaylandı",
    WAITING: "onay bekliyor",
    APPROVE: "onay",
    WAIT: "wait",
    REJECT: "red",
  };

  const filterButtons = [
    {
      id: 1,
      val: data.ticketno,
      name: "approved",
      icon: <AiOutlineCheckCircle />,
    },
    {
      id: 2,
      val: data.ticketno,
      name: "waiting for approval",
      icon: <BiTime />,
    },
    {
      id: 3,
      val: data.ticketno,
      name: "rejected",
      icon: <TiDeleteOutline />,
    },
  ];

  const filterTicket = (filterStatus) => {
    const filteredTicket = data.getFormDataFromLS.filter(
      (i) => i.status === filterStatus
    );
    setSelectedCategory(filterStatus);
    setFilterTickets(filteredTicket);
  };

  //show all tickets
  const showAll = () => {
    setFilterTickets(data.getFormDataFromLS);
    setSelectedCategory("Hepsi");
  };

  //filter favorite tickets
  const filterFav = () => {
    const favs = data.getFormDataFromLS.filter((i) => i.favorite === true);
    setFilterTickets(favs);
    setSelectedCategory("Favori");
  };

  //ticket count
  const ticketCount = (category) => {
    const a = data.getFormDataFromLS.filter((i) => i.status === category);
    return <p>{a.length}</p>;
  };

  //favorite ticket count
  const ticketFavCount = () => {
    const a = data.getFormDataFromLS.filter((i) => i.favorite === true);
    return <p>{a.length}</p>;
  };

  //filter buttons map function
  const writeFilterButton = () => {
    const buttons = filterButtons.map((filterButton) => {
      return (
        <button
          className="item"
          onClick={() => filterTicket(filterButton.name)}
        >
          <span>{filterButton.icon}</span>
          {filterButton.name}

          <span className="count">{ticketCount(filterButton.name)}</span>
        </button>
      );
    });
    return buttons;
  };

  //Admin ticket search
  const searchTicket = () => {
    const search = filterTickets
      .filter((i) => {
        return searchId === ""
          ? i
          : i.reason
              .toLocaleLowerCase()
              .trim()
              .includes(searchId.toLocaleLowerCase().trim());
      })
      .map((i) => {
        return (
          filterTickets && (
            <ul className="adminBasvuruListesi">
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
                    i.status === classStatus.APPROVED
                      ? classStatus.APPROVE
                      : i.status === classStatus.WAITING
                      ? classStatus.WAIT
                      : classStatus.REJECT
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
          )
        );
      });
    return search;
  };

  return (
    <div className="adminBasvuruListesiPage">
      <div className="filterButtons">
        <button className="item" onClick={showAll}>
          <span>{<AiOutlineUnorderedList />}</span>
          All
          <span className="count">{data.getFormDataFromLS.length}</span>
        </button>
        {writeFilterButton()}
        <button className="item" onClick={filterFav}>
          <span>{<AiOutlineStar />}</span>
          Favorite
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
      <h3 className="categoryTitle">{selectedCategory}</h3>
      <div className="adminTicketList">{searchTicket()}</div>
    </div>
  );
};

export default AdminBasvuruListesi;
