import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
import AttendancePic from "./assets/attendance.png";
import DashboardPic from "./assets/dashboard.png";
import ReportPic from "./assets/report.png";
import Logout from './assets/logout.png'
import Attendance from "./components/Attendance";
import CurrentDayAtt from "./components/CurrentDayAtt";
import Reports from "./components/Reports";
import Resources from "./UploadResource";
import Updates from "./UploadUpdates";
import Testimonials from './UploadTestimonials'

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication status from local storage
    localStorage.removeItem("authenticated");
    // Redirect to login page
    navigate("/");
  };


  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="bg-cyan-50 bg-cover h-screen bricolage-font flex">
      <div className="">
        {/* <Navbar /> */}
        <div className="flex flex-col bg-cyan-100 shadow-xl p-6 w-fit h-screen text-lg font-medium">
          <p className=" text-2xl font-semibold">Admin Dashboard</p>
          <div className=" pt-5">
            <p className="  text-slate-500">MARK</p>
            <div className=" flex space-x-2 items-center hover:bg-slate-300 px-4 py-2 rounded">
              <img className=" h-6" src={AttendancePic} alt="" />
              <button
                className="  "
                onClick={() => handleComponentClick("Attendance")}
              >
                Attendance Sheet
              </button>
            </div>
          </div>

          <div className=" pt-2">
            <p className="  text-slate-500">ANALYZE</p>
            <div className=" flex space-x-2 items-center hover:bg-slate-300 px-4 py-2 rounded">
              <img className=" h-6" src={DashboardPic} alt="" />
              <button
                className="  "
                onClick={() => handleComponentClick("CurrentDayAtt")}
              >
                Dashboard
              </button>
            </div>
            <div className=" flex space-x-2 items-center hover:bg-slate-300 px-4 py-2 rounded">
              <img className=" h-6" src={ReportPic} alt="" />
              <button
                className="  "
                onClick={() => handleComponentClick("Reports")}
              >
                Report
              </button>
            </div>
          </div>

          <div className=" pt-2">
            <p className="  text-slate-500">UPLOADS</p>
            <div className=" flex space-x-2 items-center hover:bg-slate-300 px-4 py-2 rounded">
              <img className=" h-6" src={ReportPic} alt="" />
              <button
                className="  "
                onClick={() => handleComponentClick("Resources")}
              >
                Resources
              </button>
            </div>
            <div className=" flex space-x-2 items-center hover:bg-slate-300 px-4 py-2 rounded">
              <img className=" h-6" src={DashboardPic} alt="" />
              <button
                className="  "
                onClick={() => handleComponentClick("Updates")}
              >
                Updates
              </button>
            </div>
            <div className=" flex space-x-2 items-center hover:bg-slate-300 px-4 py-2 rounded">
              <img className=" h-6" src={ReportPic} alt="" />
              <button
                className="  "
                onClick={() => handleComponentClick("Testimonials")}
              >
                Testimonials
              </button>
            </div>
          </div>
          <div className=" flex mt-4 space-x-2 items-center hover:bg-slate-300 px-4 py-2 rounded">
            <img className=" h-6" src={Logout} alt="" />
            <button
                className="  "
                onClick={handleLogout}
            >
                Logout
            </button>
          </div>
        </div>
      </div>
      <div className="flex-grow">
        {selectedComponent === "Attendance" && <Attendance />}
        {selectedComponent === "CurrentDayAtt" && <CurrentDayAtt />}
        {selectedComponent === "Reports" && <Reports />}
        {selectedComponent === "Resources" && <Resources />}
        {selectedComponent === "Updates" && <Updates />}
        {selectedComponent === "Testimonials" && <Testimonials />}
      </div>
    </div>
  );
};

export default Dashboard;
