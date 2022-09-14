import "./Alert.scss";
import { useContext } from "react";
import Context from "context/Context";

function Alert() {
  const data = useContext(Context);
  return <div className={data.alertClass()}>{data.alerts.status}</div>;
}

export default Alert;
