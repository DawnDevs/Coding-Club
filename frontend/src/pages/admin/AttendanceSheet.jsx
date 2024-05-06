// Attendance.js
import React from 'react';
import AttendanceCard from './components/AttendanceCard';
import attendanceData from './components/AttendanceData.json';

const AttendanceSheet = () => {
  return (
    <div className="p-10 mx-10">
      <p className="text-3xl font-semibold">Attendance</p>
      <div className="overflow-x-auto pt-10">
        <table className="table-auto w-full border-collapse border border-gray-400 rounded">
          <thead>
            <tr>
              <th className="border border-gray-400 w-4 px-4 py-2">S.No</th>
              <th className="border border-gray-400 px-4 py-2">Student name</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((student, index) => (
              <AttendanceCard key={index} studentData={student} /> 
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceSheet;
