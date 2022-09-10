import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateApplication.scss";
import { useFormik } from "formik";
import Context from "context/Context";
// icons
import {
  FaExclamation,
  FaRegTimesCircle,
  FaRegCheckCircle,
} from "react-icons/fa";
import validations from "../Validations";

const BasvuruOlustur = () => {
  const navigate = useNavigate();
  const data = useContext(Context);
  const getFormDataFromLS = localStorage.getItem("ticket")
    ? JSON.parse(localStorage.getItem("ticket"))
    : [];
  let val = {};
  const {
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    isValid,
  } = useFormik({
    initialValues: {
      firstName: "WFEWFEWF",
      lastName: "4WEFWFW",
      id: 22111111111,
      age: 43,
      reason: "utkjukkuku",
      address: "ergergergergergerg",

      // firstName: "",
      // lastName: "",
      // id: "",
      // age: "",
      // reason: "",
      // address: "",
      // photo: "",
    },
    validationSchema: validations,
    onSubmit: (values) => {
      if (isValid) {
        data.setSuccessControl(true);
        navigate("/basvuru-basarili");
      } else {
        data.setSuccessControl(false);
        navigate("/");
      }
      val = {
        firstname: values.firstName,
        lastname: values.lastName,
        id: values.id,
        age: values.age,
        reason: values.reason,
        address: values.address,
        ticketno: data.num,
        today: data.today,
        comment: data.comments,
        status: data.approve,
        favorite: data.favorite,
        photo: data.numForImage,
      };
      data.setFormData([
        ...getFormDataFromLS,
        {
          ...val,
        },
      ]);
    },
  });
  useEffect(() => {
    localStorage.setItem("ticket", JSON.stringify(data.formdata));
  }, [data.formdata]);

  const direct = () => {
    isValid && data.setNum(data.randomNumber(1, 10000000));
    isValid &&
      data.setNumForImage(
        `https://randomuser.me/api/portraits/men/${data.randomNumber(
          1,
          100
        )}.jpg`
      );
  };

  //basvuru input className
  const inputStatus = (touch, error) => {
    let className = "";
    if (!touch) {
      className = "input";
    } else if (touch && !error) {
      className = "input isValid";
    } else if (touch && error) {
      className = "input notisValid";
    } else {
      className = "input";
    }
    return className;
  };

  //input error messages
  const inputErrorMessage = (touch, error) => {
    return (
      touch &&
      error && (
        <div className="error">
          {error}
          <span className="icon">{<FaExclamation />}</span>
        </div>
      )
    );
  };

  //input error or check icons show
  const inputStatusIcons = (touch, error) => {
    if (touch && !error) {
      return (
        <span className="check">
          <FaRegCheckCircle />
        </span>
      );
    } else if (touch && error) {
      return (
        <span className="times">
          <FaRegTimesCircle />
        </span>
      );
    }
  };

  //basvuru textarea className
  const textareaStatus = (touch, error) => {
    let className = "";
    if (!touch) {
      className = "textarea";
    } else if (touch && !error) {
      className = "textarea isValid";
    } else if (touch && error) {
      className = "textarea notisValid";
    } else {
      className = "textarea";
    }
    return className;
  };

  //textarea error messages
  const textareaErrorMessage = (touch, error) => {
    return (
      touch &&
      error && (
        <div className="error">
          {error}
          <span className="icon">{<FaExclamation />}</span>
        </div>
      )
    );
  };

  //textarea error or check icons show
  const textareaStatusIcons = (touch, error) => {
    if (touch && !error) {
      return (
        <span className="check">
          <FaRegCheckCircle />
        </span>
      );
    } else if (touch && error) {
      return (
        <span className="times">
          <FaRegTimesCircle />
        </span>
      );
    }
  };

  //textarea message word counter
  const textareaMessageCounter = (len) => {
    return <span className="count">50 / {0 + len.length}</span>;
  };

  return (
    <div className="createTicket">
      <h1 className="title">Başvuru Formu</h1>
      <div className="container">
        <form className="ticketForm" onSubmit={handleSubmit}>
          <div className={inputStatus(touched.firstName, errors.firstName)}>
            <input
              required
              id="firstName"
              name="firstName"
              placeholder="İsim"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
            />
            {inputErrorMessage(touched.firstName, errors.firstName)}
            {inputStatusIcons(touched.firstName, errors.firstName)}
          </div>
          <div className={inputStatus(touched.lastName, errors.lastName)}>
            <input
              id="lastName"
              name="lastName"
              placeholder="Soyisim"
              required
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
            />
            {inputErrorMessage(touched.lastName, errors.lastName)}
            {inputStatusIcons(touched.lastName, errors.lastName)}
          </div>
          <div className={inputStatus(touched.id, errors.id)}>
            <input
              id="id"
              name="id"
              placeholder="TC"
              type="Number"
              onBlur={handleBlur}
              onChange={handleChange}
              required
              value={values.id}
            />
            {inputErrorMessage(touched.id, errors.id)}
            {inputStatusIcons(touched.id, errors.id)}
          </div>
          <div className={inputStatus(touched.age, errors.age)}>
            <input
              id="age"
              name="age"
              placeholder="Yaş"
              required
              type="number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.age}
            />
            {inputErrorMessage(touched.age, errors.age)}
            {inputStatusIcons(touched.age, errors.age)}
          </div>
          <div className={inputStatus(touched.reason, errors.reason)}>
            <input
              id="reason"
              name="reason"
              placeholder="Başvuru Nedeni"
              type="text"
              required
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.reason}
            />
            {inputErrorMessage(touched.reason, errors.reason)}
            {inputStatusIcons(touched.reason, errors.reason)}
          </div>
          <div className={textareaStatus(touched.address, errors.address)}>
            <textarea
              id="address"
              name="address"
              placeholder="Adres Bilgisi"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              value={values.address}
            />
            {textareaErrorMessage(touched.address, errors.address)}
            {textareaStatusIcons(touched.address, errors.address)}
            {textareaMessageCounter(values.address)}
          </div>
          <button type="submit" onClick={direct} className="BasvuruFormButton">
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};
export default BasvuruOlustur;
