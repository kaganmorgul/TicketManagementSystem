import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Context from "context/Context";
import "./AdminApplicationDetail.scss";
import Alert from "./Alert";

// icons
import { AiTwotoneStar, AiOutlineRollback } from "react-icons/ai";
import {
  BiCommentAdd,
  BiCommentMinus,
  BiTime,
  BiRefresh,
} from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { FaTimes, FaEdit, FaMinus } from "react-icons/fa";
import { useEffect } from "react";

const AdminApplicationDetail = () => {
  const navigate = useNavigate();

  const [commentArea, setCommentArea] = useState(false);

  const data = useContext(Context);

  const { id } = useParams();

  const [alerts, setAlerts] = useState({
    show: false,
    status: "",
  });

  const [ticketSetting, setTicketSetting] = useState(false);

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

  //ticket status
  const ticketStatusMsg = {
    APPROVE: "onaylandı",
    PENDING: "onay bekliyor",
    REJECT: "reddedildi",
  };

  // find ticket
  const ticket = data.getFormDataFromLS.find(
    (i) => i.ticketno === parseInt(id)
  );

  //comment textarea change value
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
    setAlerts({ show: true, status: alertMsg.COMMENT_ADD });
    data.setComments("");
    updateLS("ticket", newListForComment);
  };

  // ticket approve
  const approve = (approveID) => {
    const newListForApprove = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === approveID) {
        i.status = ticketStatusMsg.APPROVE;
      }
      return i;
    });
    setAlerts({ show: true, status: alertMsg.APPROVE });
    updateLS("ticket", newListForApprove);
  };

  // ticket reject
  const reject = (rejectID) => {
    const newListForReject = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === rejectID) {
        i.status = ticketStatusMsg.REJECT;
      }
      return i;
    });
    setAlerts({ show: true, status: alertMsg.REJECT });
    updateLS("ticket", newListForReject);
  };

  //ticket wait
  const wait = (waitID) => {
    const newforwait = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === waitID) {
        i.status = ticketStatusMsg.PENDING;
      }
      return i;
    });
    setAlerts({ show: true, status: alertMsg.WAIT });
    localStorage.setItem("ticket", JSON.stringify(newforwait));
  };

  // set Local Storage when update
  const updateLS = (ls, value) => {
    localStorage.setItem(ls, JSON.stringify(value));
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

  //remove comment
  const removeComment = (removeID) => {
    const dataforremovecomment = data.getFormDataFromLS.map((i) => {
      if (i.ticketno === removeID) {
        i.comment = "";
      }
      return i;
    });
    setAlerts({ show: true, status: alertMsg.COMMENT_CLEAR });
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

  //ticket status ClassName
  const ticketStatus = () => {
    let className = "";
    ticket.status === data.classStatus.APPROVED
      ? (className = data.classStatus.APPROVE)
      : ticket.status === data.classStatus.WAITING
      ? (className = data.classStatus.WAIT)
      : (className = data.classStatus.REJECT);

    return className;
  };

  //Alerts control
  useEffect(() => {
    alerts.show &&
      setTimeout(() => {
        setAlerts({
          show: false,
          status: "",
        });
      }, 2000);
  }, [alerts.show, alerts.status]);

  //Alert Class
  const alertClass = () => {
    let className = "";
    alerts.show ? (className = "alert active") : (className = "alert");
    return className;
  };

  //open ticket setting
  const openSetting = () => {
    setTicketSetting(!ticketSetting);
  };

  return (
    <div className="AdminBasvuruDetay">
      <h1 className="title">{`${ticket.ticketno} No'lu Ticket`}</h1>
      <div className="card">
        <img className="photo" src={ticket.photo} alt="" />
        <button className="editButton" onClick={openSetting}>
          <FaEdit />
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
          <li className="item ">
            <h2>{"Adres:"}</h2>
            <br />
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
          </li>
          <li className="item">
            <h2>{"Yorum:"}</h2>
            <span>{ticket.comment}</span>
          </li>
        </ul>
        {ticketSetting && (
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
                <p>Yorum Temizle</p>
                {ticket.comment.length > 1 && (
                  <button onClick={() => removeComment(ticket.ticketno)}>
                    <BiRefresh />
                  </button>
                )}
              </li>
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
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApplicationDetail;
