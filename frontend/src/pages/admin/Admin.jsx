import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication status from local storage
    localStorage.removeItem("authenticated");
    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="mx-auto gradient-container h-screen bricolage-font">
      <div className=" pt-6">
        <div className=" bg-transparent rounded-full px-6 border border-gray-900 p-3 mx-1 md:mx-10 lg:mx-32 flex-wrap items-center shadow-xl">
          <div
            className="flex justify-between"
            // style={{ backgroundColor: "#FF4900" }}
          >
            <h2 className="text-3xl font-semibold px-3">Dashboard</h2>
            <button
              className="border-2 border-gray-900 shadow-lg p-2 px-4 rounded-full w-fit font-semibold bg-gradient-to-tr from-cyan-400 via-cyan-200 to-cyan-100 hover:from-cyan-100 hover:via-cyan-200 hover:to-cyan-400 hover:scale-95"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className=" flex justify-center">
        <div className="mx-5 my-10 md:mx-2 space-y-10 pt-[6%] w-96">
          <Link
            to="/admin/uploadResources"
            className=" text-white font-semibold px-6 py-4 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 block text-center"
            style={{ backgroundColor: "#136163" }}
          >
            Upload Resource
          </Link>
          <Link
            to="/admin/uploadupdates"
            className="text-white font-semibold px-6 py-4 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 block text-center"
            style={{ backgroundColor: "#18848e" }}
          >
            Upload Updates
          </Link>
          <Link
            to="/admin/uploadtestimonials"
            className="text-white font-semibold px-6 py-4 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 block text-center"
            style={{ backgroundColor: "#1a98a6" }}
          >
            Upload Testimonials
          </Link>
          <Link
            to="/admin/attendance"
            className="text-white font-semibold px-6 py-4 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 block text-center"
            style={{ backgroundColor: "#1dadc0" }}
          >
            Attendance
          </Link>
          <Link
            to="/admin/admindashboard"
            className="text-white font-semibold px-6 py-4 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 block text-center"
            style={{ backgroundColor: "#1dadc0" }}
          >
            Dashboard
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
