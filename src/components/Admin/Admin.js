import React, { useContext } from "react";
import AdminNav from "components/Navs/AdminNav/AdminNav";
import { Navigate } from "react-router-dom";
import Context from "context/Context";
import "./Admin.scss";
function Admin() {
  const authData = useContext(Context);
  return (
    <div className="Admin">
      {authData.login ? (
        <AdminNav setLogin={authData.setLogin} />
      ) : (
        <Navigate to="/admin-login" />
      )}
    </div>
  );
}

export default Admin;
