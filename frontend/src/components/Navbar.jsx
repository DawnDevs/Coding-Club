import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginPic from '../assets/login.png'
const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu === activeMenu ? null : menu);
  };

  return (
    <div className="bg-transparent border border-gray-900 rounded-full mx-1 md:mx-10 lg:mx-32 flex-wrap shadow-xl bricolage-font">
      <div className="flex items-center p-4 mx-3 text-gray-900 text-xl justify-between">
        <Link to="/">
          {/* <img
            className=" h-12 hover:scale-95 hover:cursor-pointer"
            src={NavLogo}
            alt=""
          /> */}
          <p>JFC Coding Club</p>
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
              to="/track"
              className={
                "px-2 `menu-item`"
              }
              activeClassName="active"
              onMouseEnter={() => handleMenuClick("about")}
            >
              About
            </Link>
          </li>
          <li className="hover:cursor-pointer hover:shadow-xl border border-gray-400 p-2 rounded-full transition-transform hover:scale-95 ease-in-out">
            <Link
              to="/track"
              className={
                "px-2 `menu-item`"
              }
              activeClassName="active"
              onMouseEnter={() => handleMenuClick("web3")}
            >
              Dashboard
            </Link>
          </li>
          <li className="hover:cursor-pointer hover:shadow-xl border border-gray-400 p-2 rounded-full transition-transform hover:scale-95 ease-in-out">
            <Link
              to="/track"
              className={
                "px-2 `menu-item`"
              }
              activeClassName="active"
              onMouseEnter={() => handleMenuClick("contact")}
            >
              Team
            </Link>
          </li>
        </ul>
        <div className=" hover:cursor-pointer transition-transform hover:scale-95 ">
            <img src={LoginPic} className=" h-12" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;