// import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./UserNav.scss";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { useState } from "react";

function Nav() {
  // usernav show/close
  const [menuShow, setMenuShow] = useState(false);

  // open close menu
  const MenuOpen = () => {
    setMenuShow(!menuShow);
  };

  // UserNavActiveClassName
  const navClassName = () => {
    let className = "";
    if (menuShow) {
      className = "list active";
    } else {
      className = "list";
    }
    return className;
  };

  return (
    <>
      <nav className="userNav">
        <div className="navIcon">
          <AiOutlineMenu onClick={MenuOpen} />
        </div>
        <ul onClick={() => MenuOpen()} className={navClassName()}>
          <span className="listIcon">
            <AiOutlineMenu onClick={MenuOpen} />
          </span>
          <li onClick={() => MenuOpen()} className="listItem">
            <BsPencilSquare />
            <Link to="/basvuru-olustur">Başvuru Oluştur</Link>
          </li>
          <li onClick={() => MenuOpen()} className="listItem">
            <AiOutlineSearch />
            <Link to="/basvuru-sorgula">Başvuru Sorgula</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Nav;
