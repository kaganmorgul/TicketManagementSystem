import React, { useState, useContext } from "react";
import Alert from "../../Other/Alert";
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
import { FaTimes } from "react-icons/fa";

function EditTicket({ ticket, ticketSetting }) {
  const data = useContext(Context);

  const [commentArea, setCommentArea] = useState(false);

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
    data.setAlerts({
      show: true,
      status: data.alertMsg.COMMENT_ADD,
      time: 2000,
    });
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
    data.setAlerts({
      show: true,
      status: data.alertMsg.COMMENT_CLEAR,
      time: 2000,
    });
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
    data.setAlerts({ show: true, status: data.alertMsg.APPROVE, time: 2000 });
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
    data.setAlerts({ show: true, status: data.alertMsg.REJECT, time: 2000 });
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
    data.setAlerts({ show: true, status: data.alertMsg.WAIT, time: 2000 });
  };

  // ticket fav
  const fav = (favoriteID) => {
    const newListForFav = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === favoriteID) {
        i.favorite = !i.favorite;
        i.favorite
          ? data.setAlerts({
              show: true,
              status: data.alertMsg.FAV_TRUE,
              time: 2000,
            })
          : data.setAlerts({
              show: true,
              status: data.alertMsg.FAV_FALSE,
              time: 2000,
            });
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
    <div className={ticketSetting ? "cardSetting active" : "cardSetting"}>
      <Alert />
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
