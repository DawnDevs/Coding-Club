import React, { useState } from "react";
import { Link } from "react-router-dom";
import JFC from '../assets/jfc.png'
import Connect from "./Connect";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu === activeMenu ? null : menu);
  };

  return (
    <div className="bg-transparent rounded-full border border-gray-900 mx-1 md:mx-10 lg:mx-32 flex-wrap shadow-xl bricolage-font">
      <div className="flex items-center p-4 mx-3 text-gray-900 text-xl justify-between">
        <Link className=" flex items-center" to="/">
          <img
            className=" h-12 hover:scale-95 hover:cursor-pointer"
            src={JFC}
            alt=""
          />
          <p className=" text-xl font-semibold">Anonymous</p>
        </Link>
        <ul className="hidden md:flex justify-center font-medium text-base space-x-6 ">
          <li className="hover:cursor-pointer hover:shadow-xl border border-gray-400 p-2 rounded-full transition-transform hover:scale-95 ease-in-out">
            <Link
              to="/"
              className={
                " px-2 `menu-item`"
              }
              activeClassName="active"
              onMouseEnter={() => handleMenuClick("home")}
            >
              Home
            </Link>
          </li>
          <li className="hover:cursor-pointer hover:shadow-xl border border-gray-400 p-2 rounded-full transition-transform hover:scale-95 ease-in-out">
            <Link
              to="/resources"
              className={
                "px-2 `menu-item`"
              }
              activeClassName="active"
              onMouseEnter={() => handleMenuClick("resources")}
            >
              Resources
            </Link>
          </li>
          <li className="hover:cursor-pointer hover:shadow-xl border border-gray-400 p-2 rounded-full transition-transform hover:scale-95 ease-in-out">
            <Link
              to="/dashboard"
              className={
                "px-2 `menu-item`"
              }
              activeClassName="active"
              onMouseEnter={() => handleMenuClick("dashboard")}
            >
              Dashboard
            </Link>
          </li>
          <li className="hover:cursor-pointer hover:shadow-xl border border-gray-400 p-2 rounded-full transition-transform hover:scale-95 ease-in-out">
            <Link
              to="/updates"
              className={
                "px-2 `menu-item`"
              }
              activeClassName="active"
              onMouseEnter={() => handleMenuClick("updates")}
            >
              Updates
            </Link>
          </li>
        </ul>
        <div className=" hover:cursor-pointer transition-transform hover:scale-95 ">
          <Link activeClassName="active"
              onMouseEnter={() => handleMenuClick("signup")}>
            <Connect setUserEmail={setUserEmail} className=" border-2 border-gray-900 shadow-lg p-2 px-4 rounded-full w-fit font-semibold bg-gradient-to-tr from-cyan-400 via-cyan-200 to-cyan-100 hover:from-cyan-100 hover:via-cyan-200 hover:to-cyan-400 hover:scale-95">Sign up 🡥</Connect>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;