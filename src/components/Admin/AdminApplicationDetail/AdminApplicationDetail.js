import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Context from "context/Context";
import "./AdminApplicationDetail.scss";

// icons
import { AiOutlineRollback } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import EditTicket from "./EditTicket";

function AdminApplicationDetail() {
  const navigate = useNavigate();

  const data = useContext(Context);

  const { id } = useParams();

  const [ticketSetting, setTicketSetting] = useState(false);

  const [alerts, setAlerts] = useState({
    show: false,
    status: "",
  });

  // find ticket
  const ticket = data.getFormDataFromLS.find(
    (i) => i.ticketno === parseInt(id)
  );

  // backToPreviousPage
  const backToPreviousPage = () => navigate("../", { replace: true });

  // ticket status ClassName
  const ticketStatus = () => {
    let className = "";
    ticket.status === data.classStatus.APPROVED
      ? (className = data.classStatus.APPROVE)
      : ticket.status === data.classStatus.WAITING
        ? (className = data.classStatus.WAIT)
        : (className = data.classStatus.REJECT);

    return className;
  };

  // Alerts control
  useEffect(() => {
    alerts.show &&
      setTimeout(() => {
        setAlerts({
          show: false,
          status: "",
        });
      }, 2000);
  }, [alerts.show, alerts.status]);

  // open ticket setting
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
        <button onClick={backToPreviousPage} className="backicon">
          <AiOutlineRollback />
        </button>
        <ul className="list">
          <li className="item">
            <h2>İsim:</h2>
            <span>{ticket.firstname}</span>
          </li>
          <li className="item">
            <h2>Soyisim:</h2>
            <span>{ticket.lastname}</span>
          </li>
          <li className="item">
            <h2>TC Kimlik No:</h2>
            <span>{ticket.id}</span>
          </li>
          <li className="item">
            <h2>Ticket no:</h2>
            <span>{ticket.ticketno}</span>
          </li>
          <li className="item ">
            <h2>Adres:</h2>
            <br />
            <span>{ticket.address}</span>
          </li>
          <li className="item">
            <h2>Konu:</h2>
            <span>{ticket.reason}</span>
          </li>
          <li className="item">
            <h2>Tarih:</h2>
            <span>{ticket.today}</span>
          </li>
          <li className="item">
            <h2>Durum:</h2>
            <span className={ticketStatus()}>{ticket.status}</span>
          </li>
          <li className="item">
            <h2>Yorum:</h2>
            <span>{ticket.comment}</span>
          </li>
        </ul>
        {ticketSetting && (
          <EditTicket
            alerts={alerts}
            setAlerts={setAlerts}
            ticket={ticket}
            openSetting={openSetting}
          />
        )}
      </div>
    </div>
  );
}

export default AdminApplicationDetail;
