import React from "react";
import "./Alert.scss";

const Alert = ({ alerts, alertClass }) => {
  return <div className={alertClass()}>{alerts.status}</div>;
};

export default Alert;
