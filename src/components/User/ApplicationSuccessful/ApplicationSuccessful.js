import { useNavigate } from "react-router-dom";
import "./ApplicationSuccessful.scss";
import { useEffect, useState, useContext } from "react";
import Context from "context/Context";
// icons
import { AiOutlineCheckCircle } from "react-icons/ai";

function Success() {
  const navigate = useNavigate();
  const data = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    !data.successControl && navigate("../", { replace: true });
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  useEffect(() => {
    setTimeout(() => {
      navigate("../", { replace: true });
    }, 5000);
  });
  return (
    data.successControl && (
      <>
        {loading ? (
          <img
            className="successLoading"
            src="../../photos/loading.gif"
            alt=""
          />
        ) : (
          <div className="applicationSuccessBox">
            <h2 className="title">Başvurunuz İletildi</h2>
            <h2 className="title">Ticket No</h2>
            <p className="text">{data.num}</p>
            <span className="icon">
              <AiOutlineCheckCircle />
            </span>
          </div>
        )}
      </>
    )
  );
}

export default Success;
