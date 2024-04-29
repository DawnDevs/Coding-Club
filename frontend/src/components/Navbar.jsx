import React, { useState } from "react";
import { Link } from "react-router-dom";
import JFC from "../assets/jfc.png";
import Connect from "./Connect";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [userEmail, setUserEmail] = useState(null);


  const handleMenuClick = (menu) => {
    setActiveMenu(menu === activeMenu ? null : menu);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleCloseClick = () => {
    setIsOpen(false); // Close the sidebar when the close button is clicked
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
        {/* Mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="block text-xl font-semibold focus:outline-none mr-4"
          >
            ☰
          </button>
        </div>
        <div
          className={`lg:hidden absolute inset-y-0 z-50 left-0 transform transition duration-300 ease-in-out bg-white text-black backdrop-filter backdrop-blur-lg h-screen w-64 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={handleCloseClick}
            className="absolute top-0 right-0 m-4 text-2xl focus:outline-none"
          >
            ❌
          </button>
          <ul className="px-4 mt-16 space-y-2 poppins-font font-medium">
            <li>
              <Link
                to="/"
                className="py-1 px-1 mx-1 md:py-3 md:px-3 md:mx-3 flex-wrap hover:bg-gradient-to-t from-pink-500 via-red-500 to-yellow-500 hover:rounded-md cursor-pointer hover:text-black"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/experience"
                className="py-1 px-1 mx-1 md:py-3 md:px-3 md:mx-3 flex-wrap hover:bg-gradient-to-t from-pink-500 via-red-500 to-yellow-500 hover:rounded-md cursor-pointer hover:text-black"
              >
                Experience
              </Link>
            </li>
            <li>
              <Link
                to="/works"
                className="py-1 px-1 mx-1 md:py-3 md:px-3 md:mx-3 flex-wrap hover:bg-gradient-to-t from-pink-500 via-red-500 to-yellow-500 hover:rounded-md cursor-pointer hover:text-black"
              >
                My Works
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="py-1 px-1 mx-1 pt-2 md:py-3 md:px-3 md:mx-3 flex-wrap hover:bg-gradient-to-t from-pink-500 via-red-500 to-yellow-500 hover:rounded-md cursor-pointer hover:text-black"
              >
                Contact
              </Link>
            </li>
            <div className="">
              <Link
                activeClassName="active"
                onMouseEnter={() => handleMenuClick("signup")}
              >
                <Connect
                  setUserEmail={setUserEmail}
                  className=" border-2 border-gray-900 shadow-lg p-2 px-4 rounded-full w-fit font-semibold bg-gradient-to-tr from-cyan-400 via-cyan-200 to-cyan-100 hover:from-cyan-100 hover:via-cyan-200 hover:to-cyan-400 hover:scale-95"
                >
                  Sign up 🡥
                </Connect>
              </Link>
            </div>
          </ul>
        </div>
        {/* Desktop */}

        <ul className="hidden lg:flex justify-center font-medium text-base space-x-6 ">
            <Link
              to="/"
              className={" px-4 p-2 hover:cursor-pointer hover:shadow-xl border border-gray-400 rounded-full transition-transform hover:scale-95 ease-in-out `menu-item` "}
              activeClassName="active"
              onMouseEnter={() => handleMenuClick("home")}
            >
              Home
            </Link>
            <Link
              to="/resources"
              className={"px-4 p-2 hover:cursor-pointer hover:shadow-xl border border-gray-400 rounded-full transition-transform hover:scale-95 ease-in-out `menu-item`"}
              activeClassName="active"
              onMouseEnter={() => handleMenuClick("resources")}
            >
              Resources
            </Link>
            <Link
              to="/dashboard"
              className={"px-4 p-2 hover:cursor-pointer hover:shadow-xl border border-gray-400 rounded-full transition-transform hover:scale-95 ease-in-out `menu-item`"}
              activeClassName="active"
              onMouseEnter={() => handleMenuClick("dashboard")}
            >
              Dashboard
            </Link>
            <Link
              to="/updates"
              className={"px-4 p-2 hover:cursor-pointer hover:shadow-xl border border-gray-400 rounded-full transition-transform hover:scale-95 ease-in-out `menu-item`"}
              activeClassName="active"
              onMouseEnter={() => handleMenuClick("updates")}
            >
              Updates
            </Link>
        </ul>
          <Link className="hidden lg:flex hover:cursor-pointer transition-transform hover:scale-95"
            activeClassName="active"
            onMouseEnter={() => handleMenuClick("signup")}
          >
            <Connect
              setUserEmail={setUserEmail}
              className=" border-2 border-gray-900 shadow-lg p-2 px-4 rounded-full w-fit font-semibold bg-gradient-to-tr from-cyan-400 via-cyan-200 to-cyan-100 hover:from-cyan-100 hover:via-cyan-200 hover:to-cyan-400 hover:scale-95"
            >
              Sign up 🡥
            </Connect>
          </Link>
      </div>
    </div>
  );
};

export default Navbar;
