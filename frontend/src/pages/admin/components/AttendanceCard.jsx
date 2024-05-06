// AttendanceCard.js
import React from 'react';

const AttendanceCard = ({ studentData }) => {
  if (!studentData) {
    return null; // Return null if studentData is undefined or null
  }

  return (
    <tr className=''>
      <td className="border border-gray-400 px-4 py-2">{studentData.id}</td>
      <td className="border border-gray-400 px-4 py-2">{studentData.name}</td>
      <td className="flex justify-center space-x-16 px-4 py-2">
        <button className="bg-green-500 hover:bg-green-400 p-2 px-4 rounded">Present </button>
        <button className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded">Absent ✖️</button>
      </td>
    </tr>
  );
};

export default AttendanceCard;
