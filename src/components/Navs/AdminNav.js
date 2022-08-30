import React, { useState } from "react";
import "../../sass/pages/AdminNav.scss";
import { Outlet, Link } from "react-router-dom";
import { BiMenu, BiMenuAltLeft, BiLogOut } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function AdminNav() {
  const authData = useContext(AuthContext);
  const [menushow, setMenuShow] = useState(false);
  return (
    <>
      <div className="navbar">
        <Link to="#">
          <BiMenu onClick={() => setMenuShow(!menushow)} />
        </Link>
        <h1>Admin</h1>
      </div>
      <nav
        onClick={() => setMenuShow(!menushow)}
        className={menushow ? "AdminNav active " : "AdminNav "}
      >
        <h1 className="AdminNav-icon">
          <Link to="#">
            <BiMenuAltLeft onClick={() => setMenuShow(!menushow)} />
          </Link>
        </h1>
        <h3 className="AdminNav-title">
          <Link to="/admin">Admin </Link>
        </h3>
        <ul className="AdminNav__list">
          <li className="AdminNav__list-item">
            <AiFillHome />
            <Link to="/">Anasayfa</Link>
          </li>
          <li className="AdminNav__list-item">
            <FaClipboardList />
            <Link to="/admin/basvuru-listesi">Başvuru Listesi</Link>
          </li>
          <li className="AdminNav__list-item">
            <BiLogOut />
            <button
              className="AdminNav-exitbutton"
              onClick={() => authData.setLogin(false)}
            >
              Çıkış
            </button>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

export default AdminNav;
