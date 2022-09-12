import { createContext } from "react";
import { useState, useEffect } from "react";
const Context = createContext();
export const Provider = ({ children }) => {
  // LS
  const getFormDataFromLS = localStorage.getItem("ticket")
    ? JSON.parse(localStorage.getItem("ticket"))
    : [];

  // values
  const [formdata, setFormData] = useState(getFormDataFromLS);
  const [approve, setApprove] = useState("onay bekliyor");
  const [decline, setDecline] = useState("reddedildi");
  const [comments, setComments] = useState("");
  const [favorite, setFavorite] = useState(false);

  // random ticket Id
  const [num, setNum] = useState(0);

  //random number for random form image
  const [numForImage, setNumForImage] = useState(0);

  // date
  const moment = require("moment");
  const today = moment(new Date()).format("DD/MM/YYYY");

  // create random number
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // success control
  const [successControl, setSuccessControl] = useState(false);

  //auth
  const getAdminControl = sessionStorage.getItem("admin")
    ? JSON.parse(sessionStorage.getItem("admin"))
    : null;
  const [login, setLogin] = useState(getAdminControl);

  useEffect(() => {
    sessionStorage.setItem("admin", login);
  });

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  //class status
  const classStatus = {
    APPROVED: "onaylandı",
    WAITING: "onay bekliyor",
    APPROVE: "approve",
    WAIT: "pending",
    REJECT: "reject",
  };

  const vals = {
    formdata,
    setFormData,
    getFormDataFromLS,
    today,
    moment,
    approve,
    setApprove,
    comments,
    setComments,
    decline,
    setDecline,
    favorite,
    setFavorite,
    num,
    setNum,
    numForImage,
    setNumForImage,
    randomNumber,
    successControl,
    setSuccessControl,
    adminEmail,
    setAdminEmail,
    adminPassword,
    setAdminPassword,
    login,
    setLogin,
    classStatus,
  };
  return <Context.Provider value={vals}>{children}</Context.Provider>;
};

export default Context;
