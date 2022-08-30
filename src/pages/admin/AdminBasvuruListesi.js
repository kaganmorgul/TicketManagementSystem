import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import FormContext from "../../context/FormValContext";
import "../../sass/pages/AdminBasvuruListesi.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import {
  AiOutlineCheckCircle,
  AiOutlineUnorderedList,
  AiOutlineStar,
} from "react-icons/ai";
import { BsBoxArrowRight } from "react-icons/bs";

function AdminBasvuruListesi() {
  const data = useContext(FormContext);
  const [filterTickets, setFilterTickets] = useState(data.getFormDataFromLS);
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");
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
  const showAll = () => {
    setFilterTickets(data.getFormDataFromLS);
    setSelectedCategory("Hepsi");
  };
  const filterTicket = (filterStatus) => {
    const filteredTicket = data.getFormDataFromLS.filter(
      (i) => i.status === filterStatus
    );
    setSelectedCategory(filterStatus);
    setFilterTickets(filteredTicket);
  };
  const filterFav = () => {
    const favs = data.getFormDataFromLS.filter((i) => i.favorite === true);
    setFilterTickets(favs);
    setSelectedCategory("Favori");
  };
  const ticketCount = (category) => {
    const a = data.getFormDataFromLS.filter((i) => i.status === category);

    return <p>{a.length}</p>;
  };
  const ticketFavCount = () => {
    const a = data.getFormDataFromLS.filter((i) => i.favorite === true);

    return <p>{a.length}</p>;
  };
  return (
    <div className="AdminBasvuruListesiPage">
      <div className="filterButtons">
        <button className="filterButtons-item" onClick={showAll}>
          <span>{<AiOutlineUnorderedList />}</span>
          Hepsi
          <span className="filterButtons-item-count">
            {data.getFormDataFromLS.length}
          </span>
        </button>
        {filterButtons.map((filterButton) => {
          return (
            <button
              className="filterButtons-item"
              onClick={() => filterTicket(filterButton.name)}
            >
              <span>{filterButton.icon}</span>
              {filterButton.name}

              <span className="filterButtons-item-count">
                {ticketCount(filterButton.name)}
              </span>
            </button>
          );
        })}
        <button className="filterButtons-item" onClick={filterFav}>
          <span>{<AiOutlineStar />}</span>
          Favori
          <span className="filterButtons-item-count">{ticketFavCount()}</span>
        </button>
      </div>
      <div className="AdminSearchArea">
        <div className="AdminSearchArea__input">
          <input
            type="text"
            placeholder="Konu Girin"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button>
            <AiOutlineSearch />
          </button>
        </div>
      </div>
      <h3 className="AdminBasvuruListesiPage-categorytitle">
        {selectedCategory}
      </h3>
      <div className="AdminBasvuruListesiContainer">
        {filterTickets
          .filter((i) => {
            return searchId === ""
              ? i
              : i.reason
                  .toLocaleLowerCase()
                  .trim()
                  .includes(searchId.toLocaleLowerCase().trim());
          })
          .map((i) => {
            return filterTickets && filterTickets.length > 0 ? (
              <ul className="AdminBasvuruListesi">
                <li className="AdminBasvuruListesi-item">
                  <h4>Ticketno:</h4>
                  <span>{i.ticketno}</span>
                </li>
                <li className="AdminBasvuruListesi-item">
                  <h4>Konu:</h4>
                  <span>{i.reason.substring(0, 15)}</span>
                </li>
                <li className="AdminBasvuruListesi-item">
                  <h4>Durum:</h4>
                  <span
                    className={
                      i.status === "onaylandı"
                        ? "onay"
                        : i.status === "onay bekliyor"
                        ? "wait"
                        : "red"
                    }
                  >
                    {i.status.substring(0, 15)}
                  </span>
                </li>

                <li className="AdminBasvuruListesi-item">
                  <span>
                    <Link to={`/admin/basvuru/${i.ticketno}`}>
                      <BsBoxArrowRight />
                    </Link>
                  </span>
                  <span>{i.today.substring(0, 15)}</span>
                </li>
              </ul>
            ) : (
              <p>{"eeeeeeeeeeeeeee"}</p>
            );
          })}
      </div>
    </div>
  );
}

export default AdminBasvuruListesi;
