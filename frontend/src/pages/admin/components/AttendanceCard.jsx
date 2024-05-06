// AttendanceCard.js
import React, { useState } from 'react';

const AttendanceCard = ({ studentData }) => {
  const [present, setPresent] = useState(false);
  const [absent, setAbsent] = useState(false);

  if (!studentData) {
    return null; // Return null if studentData is undefined or null
  }

  const handlePresentChange = () => {
    setPresent(!present);
    if (!present) {
      setAbsent(false); // Ensure only one checkbox is checked
    }
  };

  const handleAbsentChange = () => {
    setAbsent(!absent);
    if (!absent) {
      setPresent(false); // Ensure only one checkbox is checked
    }
  };

  return (
    <tr>
      <td className="border border-gray-400 px-4 py-2">{studentData.id}</td>
      <td className="border border-gray-400 px-4 py-2">{studentData.name}</td>
      <td className="flex justify-center space-x-4 px-4 py-2">
        <label className=''>
          <input
            type="checkbox"
            checked={present}
            onChange={handlePresentChange}
            className="form-checkbox h-5 w-5 text-green-500"
          />
          <span className="ml-2 text-green-500">Present</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={absent}
            onChange={handleAbsentChange}
            className="form-checkbox h-5 w-5 text-red-500"
          />
          <span className="ml-2 text-red-500">Absent</span>
        </label>
      </td>
    </tr>
  );
};

export default AttendanceCard;
