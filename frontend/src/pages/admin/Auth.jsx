import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPic from '../admin/assets/admin.png'

const Auth = () => {
  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminChange = (e) => {
    setAdmin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ admin, password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        window.localStorage.setItem("authenticated", true);
        window.location.href = "./admin";
      } else {
        alert("Authentication failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again.");
    }
  };

  return (
    <div className=" p-6 min-h-screen  flex items-center justify-center bricolage-font">
      <div className="gradient-container p-8 rounded shadow-md w-fit md:[10%] lg:mx-[15%]">
        <h2 className="text-4xl mb-4 text-center font-bold">Admin Login</h2>
        <div className=" md:flex justify-between px-0 md:px-6 lg:px-24 items-center">
          <div className="">
            <img className=" md:h-80 lg:h-96 w-auto" src={AdminPic} alt="" />
          </div>
          <div className="">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="admin" className="flex justify-start text-black">
                  Admin:
                </label>
                <input
                  type="text"
                  id="admin"
                  value={admin}
                  onChange={handleAdminChange}
                  className="form-input bg-transparent border-2 p-2 rounded border-gray-900 mt-1 w-full md:w-72"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-black">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="form-input bg-transparent border-2 p-2 rounded border-gray-900 mt-1 w-full md:w-72"
                />
              </div>
              <div className=" flex justify-center">
              <button
                type="submit"
                className="border-2 border-gray-900 shadow-md hover:shadow-2xl p-2 px-4 rounded w-fit font-semibold bg-gradient-to-tr from-cyan-400 via-cyan-200 to-cyan-100 hover:from-cyan-100 hover:via-cyan-200 hover:to-cyan-400 hover:scale-95"
              >
                Login
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
