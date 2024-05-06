import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AttendancePic from "./assets/attendance.png";
import DashboardPic from "./assets/dashboard.png";
import ReportPic from "./assets/report.png";
import Logout from "./assets/logout.png";
import AttendanceSheet from "./AttendanceSheet";
import CurrentDayAtt from "./components/CurrentDayAtt";
import Reports from "./components/Reports";
import Resources from "./UploadResource";
import Updates from "./UploadUpdates";
import Testimonials from "./UploadTestimonials";

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
        <div className="flex flex-col bg-cyan-100 shadow-xl p-6 w-fit h-screen text-lg font-medium">
          <p className="text-2xl font-semibold">Admin Dashboard</p>
          <div className="">
            <p className="text-slate-500">MARK</p>
            <div
              className={`rounded ${
                selectedComponent === "AttendanceSheet" ? "bg-cyan-300" : ""
              }`}
            >
              <div className="items-center hover:bg-cyan-300 px-4 py-2 rounded">
                <button
                  className="flex gap-2 "
                  onClick={() => handleComponentClick("AttendanceSheet")}
                >
                  <img className="h-6" src={AttendancePic} alt="" />
                  Attendance Sheet
                </button>
              </div>
            </div>
          </div>

          <div>
            <p className="text-slate-500">ANALYZE</p>
            <div
              className={`rounded ${
                selectedComponent === "CurrentDayAtt" ? "bg-cyan-300" : ""
              }`}
            >
              <div className="items-center hover:bg-cyan-300 px-4 py-2 rounded">
                <button
                  className="flex gap-2"
                  onClick={() => handleComponentClick("CurrentDayAtt")}
                >
                  <img className="h-6" src={DashboardPic} alt="" />
                  Dashboard
                </button>
              </div>
            </div>
            <div
              className={`rounded ${
                selectedComponent === "Reports" ? "bg-cyan-300" : ""
              }`}
            >
              <div className="flex space-x-2 items-center hover:bg-cyan-300 px-4 py-2 rounded">
                <button
                  className="flex gap-2"
                  onClick={() => handleComponentClick("Reports")}
                >
                  <img className="h-6" src={ReportPic} alt="" />
                  Report
                </button>
              </div>
            </div>
          </div>

          <div>
            <p className="text-slate-500">UPLOADS</p>
            <div
              className={`rounded ${
                selectedComponent === "Resources" ? "bg-cyan-300" : ""
              }`}
            >
              <div className="flex space-x-2 items-center hover:bg-cyan-300 px-4 py-2 rounded">
                <button
                  className="flex gap-2"
                  onClick={() => handleComponentClick("Resources")}
                >
                  <img className="h-6" src={ReportPic} alt="" />
                  Resources
                </button>
              </div>
            </div>
            <div
              className={`rounded ${
                selectedComponent === "Updates" ? "bg-cyan-300" : ""
              }`}
            >
              <div className="flex space-x-2 items-center hover:bg-cyan-300 px-4 py-2 rounded">
                <button
                  className="flex gap-2"
                  onClick={() => handleComponentClick("Updates")}
                >
                  <img className="h-6" src={DashboardPic} alt="" />
                  Updates
                </button>
              </div>
            </div>
            <div
              className={`rounded ${
                selectedComponent === "Testimonials" ? "bg-cyan-300" : ""
              }`}
            >
              <div className="flex space-x-2 items-center hover:bg-cyan-300 px-4 py-2 rounded">
                <button
                  className="flex gap-2"
                  onClick={() => handleComponentClick("Testimonials")}
                >
                  <img className="h-6" src={ReportPic} alt="" />
                  Testimonials
                </button>
              </div>
            </div>
          </div>
          <div
            className={`rounded ${
              selectedComponent === "Logout" ? "bg-cyan-300" : ""
            }`}
          >
            <div className="flex mt-4 space-x-2 items-center hover:bg-cyan-300 px-4 py-2 rounded">
              <button className="flex gap-2" onClick={handleLogout}>
                <img className="h-6" src={Logout} alt="" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow">
        {selectedComponent === "AttendanceSheet" && <AttendanceSheet />}
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
