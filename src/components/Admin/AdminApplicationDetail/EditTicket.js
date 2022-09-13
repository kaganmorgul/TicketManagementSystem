import React, { useState, useContext } from "react";
import Alert from "./Alert";
import "./EditTicket.scss";
import Context from "context/Context";
// icons
import { AiTwotoneStar } from "react-icons/ai";
import {
  BiTime,
  BiRefresh,
  BiCommentMinus,
  BiCommentAdd,
} from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { FaTimes, FaMinus } from "react-icons/fa";

function EditTicket({ alerts, setAlerts, ticket, openSetting }) {
  const data = useContext(Context);

  const [commentArea, setCommentArea] = useState(false);

  // alert Messages
  const alertMsg = {
    APPROVE: "Ticket Onaylandı",
    WAIT: "Ticket Beklemeye alındı",
    REJECT: "Ticket Reddedildi",
    FAV_TRUE: "Favorilere Eklendi",
    FAV_FALSE: "Favorilerden Çıkartıldı",
    COMMENT_ADD: "Yorum Eklendi",
    COMMENT_CLEAR: "Yorum Temizlendi",
  };

  // Alert Class
  const alertClass = () => {
    let className = "";
    alerts.show ? (className = "alert active") : (className = "alert");
    return className;
  };

  // set Local Storage when update
  const updateLS = (ls, value) => {
    localStorage.setItem(ls, JSON.stringify(value));
  };

  // comment textarea change value
  const changeComments = (value) => {
    data.setComments(value.target.value);
  };

  // add comment
  const addComment = (commentID) => {
    const newListForComment = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === commentID) {
        i.comment = data.comments;
      }
      return i;
    });
    data.setComments("");
    updateLS("ticket", newListForComment);
    setAlerts({ show: true, status: alertMsg.COMMENT_ADD });
  };

  // remove comment
  const removeComment = (removeID) => {
    const dataforremovecomment = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === removeID) {
        i.comment = "";
      }
      return i;
    });
    data.setComments("");
    localStorage.setItem("ticket", JSON.stringify(dataforremovecomment));
    setAlerts({ show: true, status: alertMsg.COMMENT_CLEAR });
  };

  // open & close comment area
  const commentAreaShow = () => setCommentArea(!commentArea);

  // comment area change open & close icon
  const commentAreaIcons = () => {
    let icon = "";
    commentArea ? (icon = <BiCommentMinus />) : (icon = <BiCommentAdd />);
    return icon;
  };

  // ticket approve
  const approve = (approveID) => {
    const newListForApprove = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === approveID) {
        i.status = ticketStatusMsg.APPROVE;
      }
      return i;
    });
    updateLS("ticket", newListForApprove);
    setAlerts({ show: true, status: alertMsg.APPROVE });
  };

  // ticket reject
  const reject = (rejectID) => {
    const newListForReject = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === rejectID) {
        i.status = ticketStatusMsg.REJECT;
      }
      return i;
    });
    updateLS("ticket", newListForReject);
    setAlerts({ show: true, status: alertMsg.REJECT });
  };

  // ticket wait
  const wait = (waitID) => {
    const newforwait = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === waitID) {
        i.status = ticketStatusMsg.PENDING;
      }
      return i;
    });
    localStorage.setItem("ticket", JSON.stringify(newforwait));
    setAlerts({ show: true, status: alertMsg.WAIT });
  };

  // ticket fav
  const fav = (favoriteID) => {
    const newListForFav = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === favoriteID) {
        i.favorite = !i.favorite;
        i.favorite
          ? setAlerts({ show: true, status: alertMsg.FAV_TRUE })
          : setAlerts({ show: true, status: alertMsg.FAV_FALSE });
      }
      return i;
    });

    data.setFavorite(!data.favorite);
    localStorage.setItem("ticket", JSON.stringify(newListForFav));
  };

  // ticket status
  const ticketStatusMsg = {
    APPROVE: "onaylandı",
    PENDING: "onay bekliyor",
    REJECT: "reddedildi",
  };

  // favIconClassName
  const favIconClassName = () => {
    let className = "";
    ticket.favorite ? (className = "favicon active") : (className = "favicon");
    return className;
  };

  return (
    <div className="cardSetting">
      <FaMinus onClick={openSetting} />
      <Alert alerts={alerts} alertClass={alertClass} />
      <ul className="cardSettingItems">
        <li className="cardSettingItem">
          <p>Onayla</p>
          <button onClick={() => approve(ticket.ticketno)}>
            <BsCheckLg />
          </button>
        </li>
        <li className="cardSettingItem">
          <p>Reddet</p>
          <button onClick={() => reject(ticket.ticketno)}>
            <FaTimes />
          </button>
        </li>
        <li className="cardSettingItem">
          <p>Beklet</p>
          <button onClick={() => wait(ticket.ticketno)}>
            <BiTime />
          </button>
        </li>
        <li className="cardSettingItem">
          <p>Favorilere ekle</p>
          <button
            onClick={() => fav(ticket.ticketno)}
            className={favIconClassName()}
          >
            <AiTwotoneStar />
          </button>
        </li>
        <li className="cardSettingItem">
          <p>Yorum Ekle</p>
          <button onClick={commentAreaShow}>{commentAreaIcons()}</button>
        </li>
        <li className="cardSettingItem">
          {ticket.comment.length > 1 && (
            <>
              <p>Yorum Temizle</p>
              <button onClick={() => removeComment(ticket.ticketno)}>
                <BiRefresh />
              </button>
            </>
          )}
        </li>
        {commentArea && (
          <div className="comment">
            <textarea
              value={data.comments}
              onChange={(e) => changeComments(e)}
              cols="30"
              rows="10"
            />
            <button onClick={() => addComment(ticket.ticketno)}>
              Yorum Ekle
            </button>
          </div>
        )}
      </ul>
    </div>
  );
}

export default EditTicket;
