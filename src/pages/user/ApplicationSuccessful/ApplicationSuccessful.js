import { useNavigate } from "react-router-dom";
import "./ApplicationSuccessful.scss";
import { useEffect, useState } from "react";
import { useContext } from "react";
import Context from "context/Context";
// icons
import { AiOutlineCheckCircle } from "react-icons/ai";
const BasvuruBasarili = () => {
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
          <img className="onayloading" src="../../photos/loading.gif" alt="" />
        ) : (
          <>
            <div className="BasvuruOnayBox">
              <h2 className="BasvuruOnayBox__title">Başvurunuz İletildi</h2>
              <h2 className="BasvuruOnayBox__title">Ticket No</h2>
              <p className="BasvuruOnayBox__text">{data.num}</p>
              <span className="BasvuruOnayBox__icon">
                <AiOutlineCheckCircle />
              </span>
            </div>
          </>
        )}
      </>
    )
  );
};

export default BasvuruBasarili;
