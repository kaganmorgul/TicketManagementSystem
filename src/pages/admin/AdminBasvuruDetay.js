import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import FormContext from "../../context/FormValContext";
import "../../sass/pages/AdminBasvuruDetay.scss";
import { AiTwotoneStar, AiOutlineRollback } from "react-icons/ai";
import {
  BiCommentAdd,
  BiCommentMinus,
  BiTime,
  BiRefresh,
} from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";
function AdminBasvuruDetay() {
  const navigate = useNavigate();
  const [commentArea, setCommentArea] = useState(false);
  const data = useContext(FormContext);
  let { id } = useParams();
  // find ticket
  const ticket = data.getFormDataFromLS.find(
    (i) => i.ticketno === parseInt(id)
  );
  // yorumekle
  const yorumyap = (yorumid) => {
    const newListForComment = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === yorumid) {
        i.comment = data.comments;
      }
      return i;
    });
    data.setComments("");
    localStorage.setItem("ticket", JSON.stringify(newListForComment));
  };
  // ticket onay
  const onay = (onayid) => {
    const newListForApprove = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === onayid) {
        i.status = "onaylandı";
        data.setApprove("onaylandı");
      }
      return i;
    });
    localStorage.setItem("ticket", JSON.stringify(newListForApprove));
  };
  // ticket red
  const red = (redid) => {
    const newListForApprove = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === redid) {
        i.status = "reddedildi";
      }
      return i;
    });
    data.setApprove("reddedildi");
    localStorage.setItem("ticket", JSON.stringify(newListForApprove));
  };
  // ticket fav
  const fav = (favid) => {
    const newListForFav = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === favid) {
        i.favorite = !i.favorite;
        i.favorite
          ? alert("favorilere eklendi")
          : alert("Favorilerden Çıkartıldı");
      }
      return i;
    });
    data.setFavorite(!data.favorite);
    localStorage.setItem("ticket", JSON.stringify(newListForFav));
  };
  const wait = (waitid) => {
    const newforwait = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === waitid) {
        i.status = "onay bekliyor";
      }
      return i;
    });
    data.setApprove("onay bekliyor");
    alert("onay güncellendi");
    localStorage.setItem("ticket", JSON.stringify(newforwait));
  };
  const removeComment = (removeid) => {
    const dataforremovecomment = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === removeid) {
        i.comment = "";
        alert("Yorum silindi");
      }
      return i;
    });
    data.setComments("");
    localStorage.setItem("ticket", JSON.stringify(dataforremovecomment));
  };
  return (
    <div className="AdminBasvuruDetay">
      <h1 className="AdminBasvuruDetay-title">{`${ticket.ticketno} No'lu Ticket`}</h1>
      <div className="AdminBasvuruDetay__Card">
        <img
          className="AdminBasvuruDetay__Card-photo"
          src={ticket.photo}
          alt=""
        ></img>
        <button
          onClick={() => fav(ticket.ticketno)}
          className={
            ticket.favorite
              ? "AdminBasvuruDetay__Card-favicon active"
              : "AdminBasvuruDetay__Card-favicon"
          }
        >
          <AiTwotoneStar />
        </button>
        <button
          onClick={() => navigate("../", { replace: true })}
          className={"AdminBasvuruDetay__Card-backicon"}
        >
          {/* <Link to="/admin/basvuru-listesi"> */}
          <AiOutlineRollback />
          {/* </Link> */}
        </button>
        <ul className="AdminBasvuruDetay__Card__List">
          <li className="AdminBasvuruDetay__Card__List-item">
            <h2>{"İsim:"}</h2>
            <span>{ticket.firstname}</span>
          </li>
          <li className="AdminBasvuruDetay__Card__List-item">
            <h2>{"Soyisim:"}</h2>
            <span>{ticket.lastname}</span>
          </li>
          <li className="AdminBasvuruDetay__Card__List-item">
            <h2>{"TC Kimlik No:"}</h2>
            <span>{ticket.id}</span>
          </li>
          <li className="AdminBasvuruDetay__Card__List-item">
            <h2>{"Ticket no:"}</h2>
            <span>{ticket.ticketno}</span>
          </li>
          <li className="AdminBasvuruDetay__Card__List-item">
            <h2>{"Adres:"}</h2>
            <span>{ticket.address}</span>
          </li>
          <li className="AdminBasvuruDetay__Card__List-item">
            <h2>{"Konu:"}</h2>
            <span>{ticket.reason}</span>
          </li>
          <li className="AdminBasvuruDetay__Card__List-item">
            <h2>{"Tarih:"}</h2>
            <span>{ticket.today}</span>
          </li>
          <li className="AdminBasvuruDetay__Card__List-item">
            <h2>{"Durum:"}</h2>
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
            <button onClick={() => onay(ticket.ticketno)}>
              <BsCheckLg />
            </button>
            <button onClick={() => red(ticket.ticketno)}>
              <FaTimes />
            </button>
            <button onClick={() => wait(ticket.ticketno)}>
              <BiTime />
            </button>
          </li>
          <li className="AdminBasvuruDetay__Card__List-item">
            <h2>{"Yorum:"}</h2>
            <span>{`${ticket.comment}`}</span>

            <button onClick={() => setCommentArea(!commentArea)}>
              {commentArea ? <BiCommentMinus /> : <BiCommentAdd />}
            </button>
            {ticket.comment.length > 1 && (
              <button onClick={() => removeComment(ticket.ticketno)}>
                <BiRefresh />
              </button>
            )}
          </li>
        </ul>
        {commentArea && (
          <div className="AdminBasvuruDetay__Card-comment">
            <textarea
              value={data.comments}
              onChange={(e) => data.setComments(e.target.value)}
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <button onClick={() => yorumyap(ticket.ticketno)}>
              Yorum Ekle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBasvuruDetay;
