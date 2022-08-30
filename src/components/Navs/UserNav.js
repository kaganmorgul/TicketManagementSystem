// import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../../sass/pages/Nav.scss";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { useContext } from "react";
import GeneralContext from "../../context/GeneralContext";
function Nav() {
  const data = useContext(GeneralContext);

  return (
    <>
      <nav className="UserNav">
        <img className="UserNav__image" src="./photos/logo2.PNG" alt="" />
        <div className="UserNav__icon">
          <AiOutlineMenu onClick={data.MenuOpen} />
        </div>
        <ul
          onClick={() => data.MenuOpen()}
          className={data.menuShow ? "UserNav__list active" : "UserNav__list"}
        >
          <span className="UserNav__list-icon">
            <AiOutlineMenu onClick={data.MenuOpen} />
          </span>
          <li onClick={() => data.MenuOpen()} className="UserNav__list-item">
            <BsPencilSquare />
            <Link to="/basvuru-olustur">Başvuru Oluştur</Link>
          </li>
          <li onClick={() => data.MenuOpen()} className="UserNav__list-item">
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
