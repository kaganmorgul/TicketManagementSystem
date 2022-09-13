import React, { useContext } from "react";
import AdminNav from "components/Navs/AdminNav/AdminNav";
import { Navigate } from "react-router-dom";
import Context from "context/Context";

function Admin() {
  const authData = useContext(Context);
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
