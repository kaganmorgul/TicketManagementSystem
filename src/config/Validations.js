import * as Yup from "yup";

const validations = Yup.object().shape({
  firstName: Yup.string()
    .max(15, "İsim 15 karakterden az olmalı")
    .min(3, "İsim 3 karakterden fazla olmalı")
    .matches(/^[aA-zZ\s]+$/, "Lütfen geçerli karakter giriniz")
    .required("Bu alan zorunludur"),
  lastName: Yup.string()
    .max(15, "Soyisim 15 karakterden az olmalı")
    .min(3, "Soyisim 3 karakterden fazla olmalı")
    .matches(/^[aA-zZ\s]+$/, "Lütfen geçerli karakter giriniz")
    .required("Bu alan zorunludur"),
  id: Yup.string()
    .max(11, "TC kimlik numarası 11 haneden fazla olamaz")
    .min(11, "Tc kimlik numarası 11 haneden az olamaz")
    .matches(/^[0-9]*$/, "Lütfen geçerli karakter giriniz")
    .required("Bu alan zorunludur"),
  age: Yup.string()
    .required()
    .matches(/^[0-9]*$/, "Lütfen geçerli karakter giriniz")
    .required("Bu alan zorunludur"),
  reason: Yup.string()
    .max(30, "Mesaj nedeni 30 karakterden fazla olamaz")
    .min(10, "Mesaj nedeni 10 karakterden az olamaz")
    .matches(/^[aA-zZ\s]+$/, "Lütfen geçerli karakter giriniz")
    .required("Bu alan zorunludur"),
  address: Yup.string()
    .max(50, "Mesaj 50 karakterden fazla olamaz")
    .min(10, "Mesaj 10 karakterden az olamaz")
    .matches(/^[aA-zZ\s]+$/, "Lütfen geçerli karakter giriniz")
    .required("Bu alan zorunludur"),
});

export default validations;
