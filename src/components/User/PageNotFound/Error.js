import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Error.scss";

const Error = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(8);

  useEffect(() => {
    time === 0 && navigate("/");
    const interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [[time]]);
  return (
    <div className="ApplicationError">
      <div className="box">
        <p>BEKLENMEDİK DURUM, İŞLEM BAŞARISIZ !</p>
        <span>{time}</span>
      </div>
    </div>
  );
};

export default Error;
