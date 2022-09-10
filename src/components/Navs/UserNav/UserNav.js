// import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./UserNav.scss";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { useState } from "react";
const Nav = () => {
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
      className = "UserNav__list active";
    } else {
      className = "UserNav__list";
    }
    return className;
  };

  return (
    <>
      <nav className="UserNav">
        <img className="UserNav__image" src="./photos/logo2.PNG" alt="" />
        <div className="UserNav__icon">
          <AiOutlineMenu onClick={MenuOpen} />
        </div>
        <ul onClick={() => MenuOpen()} className={navClassName()}>
          <span className="UserNav__list-icon">
            <AiOutlineMenu onClick={MenuOpen} />
          </span>
          <li onClick={() => MenuOpen()} className="UserNav__list-item">
            <BsPencilSquare />
            <Link to="/basvuru-olustur">Başvuru Oluştur</Link>
          </li>
          <li onClick={() => MenuOpen()} className="UserNav__list-item">
            <AiOutlineSearch />
            <Link to="/basvuru-sorgula">Başvuru Sorgula</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
