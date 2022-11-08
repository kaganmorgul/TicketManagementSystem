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
  const [counter, setCounter] = useState(10);
  useEffect(() => {
    if (!data.successControl) {
      navigate("/error", { replace: true });
      setCounter(0);
    }
  });

  useEffect(() => {
    if (counter === 0) {
      setCounter(10);
      navigate("../", { replace: true });
    }
  }, [counter]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [counter]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    data.successControl && (
      <div className="successPage">
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
            <p className="info">
              <span>{counter}</span> saniye sonra anasayfaya
              yönlendirileceksiniz.
            </p>
          </div>
        )}
      </div>
    )
  );
}

export default Success;
