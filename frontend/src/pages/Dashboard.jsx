import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AttendancePic from "./admin/assets/attendance.png";
import DashboardPic from "./admin/assets/dashboard.png";
import ReportPic from "./admin/assets/report.png";
import Attendance from "../components/Attendance";
import CurrentDayAtt from "../components/CurrentDayAtt";
import Reports from "../components/Reports";

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="bg-white bg-cover h-screen bricolage-font flex">
      <div className="">
        {/* <Navbar /> */}
        <div className="flex flex-col bg-cyan-100 p-10 h-screen text-lg font-medium">
          <div className=" ">
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
              <img className=" h-6" src={DashboardPic} alt="" />
              <button
                className="  "
                onClick={() => handleComponentClick("CurrentDayAtt")}
              >
                Resources
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
          
        </div>
      </div>
      <div className="flex-grow">
        {selectedComponent === "Attendance" && <Attendance />}
        {selectedComponent === "CurrentDayAtt" && <CurrentDayAtt />}
        {selectedComponent === "Reports" && <Reports />}
      </div>
    </div>
  );
};

export default Dashboard;
