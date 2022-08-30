import { useNavigate } from "react-router-dom";
import "../../sass/pages/BasvuruBasarili.scss";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useContext } from "react";
import FormContext from "../../context/FormValContext";
import GeneralContext from "../../context/GeneralContext";

function BasvuruBasarili() {
  const navigate = useNavigate();
  const data = useContext(FormContext);
  const dataGeneral = useContext(GeneralContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    !dataGeneral.successControl && navigate("../", { replace: true });
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
    dataGeneral.successControl && (
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
}

export default BasvuruBasarili;
