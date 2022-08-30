// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpIfg7J_RlUEGiWMSgCx8MEgCgMSEYFgE",
  authDomain: "ticket-management-3e42f.firebaseapp.com",
  projectId: "ticket-management-3e42f",
  storageBucket: "ticket-management-3e42f.appspot.com",
  messagingSenderId: "490305643869",
  appId: "1:490305643869:web:008e23ed23e6c57f83b4b4",
  measurementId: "G-WVXM40FE2R",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
