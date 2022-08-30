import React from "react";
import AdminNav from "../Navs/AdminNav";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function Admin() {
  const authData = useContext(AuthContext);
  return (
    <>
      {authData.login ? (
        <AdminNav setLogin={authData.setLogin} />
      ) : (
        <Navigate to="/admin-login" />
      )}
    </>
  );
}

export default Admin;
