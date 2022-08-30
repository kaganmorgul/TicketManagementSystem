import { createContext } from "react";
import { useState } from "react";
const FormContext = createContext();
export const FormProvider = ({ children }) => {
  // LS
  const getFormDataFromLS = localStorage.getItem("ticket")
    ? JSON.parse(localStorage.getItem("ticket"))
    : [];
  // values
  const [formdata, setFormData] = useState(getFormDataFromLS);
  const [approve, setApprove] = useState("onay bekliyor");
  const [decline, setDecline] = useState("reddedildi");
  const [comments, setComments] = useState("Yorum Yapılmadı");
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
  };
  return <FormContext.Provider value={vals}>{children}</FormContext.Provider>;
};

export default FormContext;
