import { createContext } from "react";
import { useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getAdminControl = sessionStorage.getItem("admin")
    ? JSON.parse(sessionStorage.getItem("admin"))
    : null;
  const [login, setLogin] = useState(getAdminControl);

  useEffect(() => {
    sessionStorage.setItem("admin", login);
  });

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const vals = {
    adminEmail,
    setAdminEmail,
    adminPassword,
    setAdminPassword,
    login,
    setLogin,
  };
  return <AuthContext.Provider value={vals}>{children}</AuthContext.Provider>;
};

export default AuthContext;
