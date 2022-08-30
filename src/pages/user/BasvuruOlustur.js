import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/pages/BasvuruOlustur.scss";
import FormContext from "../../context/FormValContext";
import GeneralContext from "../../context/GeneralContext";
import {
  FaExclamation,
  FaRegTimesCircle,
  FaRegCheckCircle,
} from "react-icons/fa";
import { useFormik } from "formik";
import validations from "./Validations";

function BasvuruOlustur() {
  const navigate = useNavigate();
  const data = useContext(FormContext);
  const dataGeneral = useContext(GeneralContext);
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
        dataGeneral.setSuccessControl(true);
        navigate("/basvuru-basarili");
      } else {
        dataGeneral.setSuccessControl(false);
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
  const poopityScoop = () => {
    window.ononline = (event) => {
      console.log("Back Online");
    };

    window.onoffline = (event) => {
      console.log("Connection Lost");
    };
  };
  poopityScoop();
  return (
    <div className="BasvuruOlustur">
      <h1 className="BasvuruOlustur__title">Başvuru Formu</h1>
      <div className="BasvuruOlustur__container">
        <form className="BasvuruForm" onSubmit={handleSubmit}>
          <div
            className={
              !touched.firstName
                ? "BasvuruForm__input"
                : touched.firstName && !errors.firstName
                ? "BasvuruForm__input isValid"
                : touched.firstName && errors.firstName
                ? "BasvuruForm__input notisValid"
                : false
            }
          >
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
            {touched.firstName && errors.firstName ? (
              <div className="BasvuruForm__input-error">
                {errors.firstName}
                <span className="BasvuruForm__input-error-icon">
                  {<FaExclamation />}
                </span>
              </div>
            ) : null}
            {!errors.firstName && touched.firstName ? (
              <span className="BasvuruForm__input-check">
                <FaRegCheckCircle />
              </span>
            ) : errors.firstName && touched.firstName ? (
              <span className="BasvuruForm__input-times">
                <FaRegTimesCircle />
              </span>
            ) : (
              false
            )}
          </div>
          <div
            className={
              !touched.lastName
                ? "BasvuruForm__input"
                : touched.lastName && !errors.lastName
                ? "BasvuruForm__input isValid"
                : touched.lastName && errors.lastName
                ? "BasvuruForm__input notisValid"
                : false
            }
          >
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
            {touched.lastName && errors.lastName ? (
              <div className="BasvuruForm__input-error">
                {errors.lastName}
                <span className="BasvuruForm__input-error-icon">
                  {<FaExclamation />}
                </span>
              </div>
            ) : null}
            {!errors.lastName && touched.lastName ? (
              <span className="BasvuruForm__input-check">
                <FaRegCheckCircle />
              </span>
            ) : errors.lastName && touched.lastName ? (
              <span className="BasvuruForm__input-times">
                <FaRegTimesCircle />
              </span>
            ) : (
              false
            )}
          </div>
          <div
            className={
              !touched.id
                ? "BasvuruForm__input"
                : touched.id && !errors.id
                ? "BasvuruForm__input isValid"
                : touched.id && errors.id
                ? "BasvuruForm__input notisValid"
                : false
            }
          >
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
            {touched.id && errors.id ? (
              <div className="BasvuruForm__input-error">
                {errors.id}
                <span className="BasvuruForm__input-error-icon">
                  {<FaExclamation />}
                </span>
              </div>
            ) : null}
            {!errors.id && touched.id ? (
              <span className="BasvuruForm__input-check">
                <FaRegCheckCircle />
              </span>
            ) : errors.id && touched.id ? (
              <span className="BasvuruForm__input-times">
                <FaRegTimesCircle />
              </span>
            ) : (
              false
            )}
          </div>
          <div
            className={
              !touched.age
                ? "BasvuruForm__input"
                : touched.age && !errors.age
                ? "BasvuruForm__input isValid"
                : touched.age && errors.age
                ? "BasvuruForm__input notisValid"
                : false
            }
          >
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
            {touched.age && errors.age ? (
              <div className="BasvuruForm__input-error">
                {errors.age}
                <span className="BasvuruForm__input-error-icon">
                  {<FaExclamation />}
                </span>
              </div>
            ) : null}
            {!errors.age && touched.age ? (
              <span className="BasvuruForm__input-check">
                <FaRegCheckCircle />
              </span>
            ) : errors.age && touched.age ? (
              <span className="BasvuruForm__input-times">
                <FaRegTimesCircle />
              </span>
            ) : (
              false
            )}
          </div>
          <div
            className={
              !touched.reason
                ? "BasvuruForm__input"
                : touched.reason && !errors.reason
                ? "BasvuruForm__input isValid"
                : touched.reason && errors.reason
                ? "BasvuruForm__input notisValid"
                : false
            }
          >
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
            {touched.reason && errors.reason ? (
              <div className="BasvuruForm__input-error">
                {errors.reason}
                <span className="BasvuruForm__input-error-icon">
                  {<FaExclamation />}
                </span>
              </div>
            ) : null}
            {!errors.reason && touched.reason ? (
              <span className="BasvuruForm__input-check">
                <FaRegCheckCircle />
              </span>
            ) : errors.reason && touched.reason ? (
              <span className="BasvuruForm__input-times">
                <FaRegTimesCircle />
              </span>
            ) : (
              false
            )}
          </div>
          <div
            className={
              !touched.address
                ? "BasvuruForm__textarea"
                : touched.address && !errors.address
                ? "BasvuruForm__textarea isValid"
                : touched.address && errors.address
                ? "BasvuruForm__textarea notisValid"
                : false
            }
          >
            <textarea
              id="address"
              name="address"
              placeholder="Adres Bilgisi"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              value={values.address}
            />
            {touched.address && errors.address ? (
              <div className="BasvuruForm__input-error">
                {errors.address}
                <span className="BasvuruForm__input-error-icon">
                  {<FaExclamation />}
                </span>
              </div>
            ) : null}
            {!errors.address && touched.address ? (
              <span className="BasvuruForm__textarea-check">
                <FaRegCheckCircle />
              </span>
            ) : errors.address && touched.address ? (
              <span className="BasvuruForm__textarea-times">
                <FaRegTimesCircle />
              </span>
            ) : (
              false
            )}
            {values.address.length > 0 && (
              <span className="BasvuruForm__textarea-count">
                50 / {50 - values.address.length}
              </span>
            )}
          </div>
          {/* <label htmlFor="">
            <input
              id="photo"
              name="photo"
              accept="image/*"
              className="BasvuruForm__fileinput"
              type="file"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.photo}
            />
          </label> */}
          <button
            type="submit"
            onClick={direct}
            className="BasvuruForm__button"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
}
export default BasvuruOlustur;
