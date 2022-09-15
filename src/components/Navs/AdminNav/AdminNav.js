import React, { useState, useContext } from "react";
import "./AdminNav.scss";
import { Outlet, Link } from "react-router-dom";
import Context from "context/Context";
// icons
import { BiMenu, BiMenuAltLeft, BiLogOut } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

function AdminNav() {
  const authData = useContext(Context);
  const [menuShow, setMenuShow] = useState(false);

  // open close menu
  const sideBar = () => {
    setMenuShow(!menuShow);
  };

  // exit
  const exit = () => {
    authData.setLogin(false);
  };

  // AdmiNavActiveClassName
  const navClassName = () => {
    let className = "";
    if (menuShow) {
      className = "adminNav active";
    } else {
      className = "adminNav";
    }
    return className;
  };

  return (
    <>
      <div className="navbar">
        <Link to="#">
          <BiMenu onClick={sideBar} />
        </Link>
        <h1>Admin</h1>
      </div>
      <nav onClick={sideBar} className={navClassName()}>
        <h1 className="icon">
          <Link to="#">
            <BiMenuAltLeft onClick={sideBar} />
          </Link>
        </h1>
        <h3 className="title">
          <Link to="/admin">Admin </Link>
        </h3>
        <ul className="list">
          <li className="listItem">
            <AiFillHome />
            <Link to="/">Anasayfa</Link>
          </li>
          <li className="listItem">
            <FaClipboardList />
            <Link to="/admin/basvuru-listesi">Başvuru Listesi</Link>
          </li>
          <li className="listItem">
            <BiLogOut />
            <button className="exitButton" onClick={exit}>
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
