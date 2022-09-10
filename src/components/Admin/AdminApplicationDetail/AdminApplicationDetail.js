import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Context from "context/Context";
import "./AdminApplicationDetail.scss";

// icons
import { AiTwotoneStar, AiOutlineRollback } from "react-icons/ai";
import {
  BiCommentAdd,
  BiCommentMinus,
  BiTime,
  BiRefresh,
} from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

const AdminBasvuruDetay = () => {
  const navigate = useNavigate();

  const [commentArea, setCommentArea] = useState(false);

  const data = useContext(Context);

  const { id } = useParams();

  // ticket status class vals
  const classStatus = {
    APPROVED: "onaylandı",
    WAITING: "onay bekliyor",
    APPROVE: "onay",
    WAIT: "wait",
    REJECT: "red",
  };

  // find ticket
  const ticket = data.getFormDataFromLS.find(
    (i) => i.ticketno === parseInt(id)
  );

  // add comment
  const addComment = (yorumid) => {
    const newListForComment = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === yorumid) {
        i.comment = data.comments;
      }
      return i;
    });
    data.setComments("");
    localStorage.setItem("ticket", JSON.stringify(newListForComment));
  };

  // ticket approve
  const approve = (onayid) => {
    const newListForApprove = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === onayid) {
        i.status = "onaylandı";
        data.setApprove("onaylandı");
      }
      return i;
    });
    localStorage.setItem("ticket", JSON.stringify(newListForApprove));
  };

  // ticket reject
  const reject = (redid) => {
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

  //ticket wait
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

  //remove comment
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

  //backToPreviousPage
  const backToPreviousPage = () => navigate("../", { replace: true });

  //favIconClassName
  const favIconClassName = () => {
    let className = "";
    ticket.favorite ? (className = "favicon active") : (className = "favicon");
    return className;
  };

  //open & close comment area
  const commentAreaShow = () => setCommentArea(!commentArea);

  //comment area change open & close icon
  const commentAreaIcons = () => {
    let icon = "";
    commentArea ? (icon = <BiCommentMinus />) : (icon = <BiCommentAdd />);
    return icon;
  };

  //comment textarea change value
  const changeComments = (value) => {
    data.setComments(value.target.value);
  };

  //ticket status ClassName
  const ticketStatus = () => {
    let className = "";
    ticket.status === classStatus.APPROVED
      ? (className = classStatus.APPROVE)
      : ticket.status === classStatus.WAITING
      ? (className = classStatus.WAIT)
      : (className = classStatus.REJECT);

    return className;
  };

  return (
    <div className="AdminBasvuruDetay">
      <h1 className="title">{`${ticket.ticketno} No'lu Ticket`}</h1>
      <div className="card">
        <img className="photo" src={ticket.photo} alt="" />
        <button
          onClick={() => fav(ticket.ticketno)}
          className={favIconClassName()}
        >
          <AiTwotoneStar />
        </button>
        <button onClick={backToPreviousPage} className={"backicon"}>
          <AiOutlineRollback />
        </button>
        <ul className="list">
          <li className="item">
            <h2>{"İsim:"}</h2>
            <span>{ticket.firstname}</span>
          </li>
          <li className="item">
            <h2>{"Soyisim:"}</h2>
            <span>{ticket.lastname}</span>
          </li>
          <li className="item">
            <h2>{"TC Kimlik No:"}</h2>
            <span>{ticket.id}</span>
          </li>
          <li className="item">
            <h2>{"Ticket no:"}</h2>
            <span>{ticket.ticketno}</span>
          </li>
          <li className="item">
            <h2>{"Adres:"}</h2>
            <span>{ticket.address}</span>
          </li>
          <li className="item">
            <h2>{"Konu:"}</h2>
            <span>{ticket.reason}</span>
          </li>
          <li className="item">
            <h2>{"Tarih:"}</h2>
            <span>{ticket.today}</span>
          </li>
          <li className="item">
            <h2>{"Durum:"}</h2>
            <span className={ticketStatus()}>{ticket.status}</span>
            <button onClick={() => approve(ticket.ticketno)}>
              <BsCheckLg />
            </button>
            <button onClick={() => reject(ticket.ticketno)}>
              <FaTimes />
            </button>
            <button onClick={() => wait(ticket.ticketno)}>
              <BiTime />
            </button>
          </li>
          <li className="item">
            <h2>{"Yorum:"}</h2>
            <span>{ticket.comment}</span>
            <button onClick={commentAreaShow}>{commentAreaIcons()}</button>
            {ticket.comment.length > 1 && (
              <button onClick={() => removeComment(ticket.ticketno)}>
                <BiRefresh />
              </button>
            )}
          </li>
        </ul>
        {commentArea && (
          <div className="comment">
            <textarea
              value={data.comments}
              onChange={(e) => changeComments(e)}
              cols="30"
              rows="10"
            ></textarea>
            <button onClick={() => addComment(ticket.ticketno)}>
              Yorum Ekle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBasvuruDetay;
