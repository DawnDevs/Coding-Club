import React, { useEffect, useState } from 'react';

const Attendance = () => {
    const [studentData, setStudentData] = useState([]);
    const [error, setError] = useState(null);
    const [attendanceMessage, setAttendanceMessage] = useState('');
    const [individualAttendanceStats, setIndividualAttendanceStats] = useState({});
    const [attendanceStats, setAttendanceStats] = useState({ distinctCount: 0, detailedStats: [] });

    const markAttendance = async (email, isPresent) => {
        try {
            const response = await fetch("http://localhost:5000/api/attendance", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, present: isPresent }),
            });
            if (response.ok) {
                const data = await response.json();
                setAttendanceMessage(data.message);
                console.log("Attendance updated");
                // Fetch updated attendance statistics
                fetchAttendanceStats();
                // Fetch individual attendance stats for the specific email
                fetchIndividualAttendanceStats();
            } else {
                const data = await response.json();
                setAttendanceMessage(data.error);
                console.log(attendanceMessage);
            }
        } catch (error) {
            console.error("Error updating attendance:", error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/getstudents");
            if (!response.ok) {
                throw new Error("Failed to fetch student data");
            }
            const data = await response.json();
            setStudentData(data);
            // Fetch individual attendance stats after fetching student data
            fetchIndividualAttendanceStats(); // Move this line inside the then block
        } catch (error) {
            setError(error.message);
            console.error("Error fetching student data:", error);
        }
    };
    

    const fetchAttendanceStats = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/attendance/stats");
            if (!response.ok) {
                throw new Error("Failed to fetch attendance statistics");
            }
            const data = await response.json();
            setAttendanceStats(data);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching attendance statistics:", error);
        }
    };

    const fetchIndividualAttendanceStats = async () => {
        try {
            const promises = studentData.map(async (student) => {
                const response = await fetch(`http://localhost:5000/api/attendance/stats/${student.email}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch individual attendance statistics for ${student.email}`);
                }
                return { email: student.email, data: await response.json() };
            });
            const results = await Promise.all(promises);
            const updatedStats = {};
            results.forEach(({ email, data }) => {
                updatedStats[email] = data;
            });
            setIndividualAttendanceStats(updatedStats);
            console.log(individualAttendanceStats);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching individual student attendance statistics:", error);
        }
    };

    useEffect(() => {
        if (studentData.length === 0) {
            fetchData();
        }
    }, [studentData]);

    useEffect(() => {
        fetchIndividualAttendanceStats();
    }, [individualAttendanceStats])
    

    useEffect(() => {
        fetchAttendanceStats();
    }, [studentData]);

    return (
        <div>
            <h1>Attendance</h1>
            <div>
                <h2>Distinct Count of Dates: {attendanceStats.distinctCount}</h2>
                <ul className='grid grid-cols-3'>
                    {attendanceStats.detailedStats.map((stat, index) => (
                        <li key={index}>
                            <h3>Date: {stat._id}</h3>
                            <p>Total Strength: {stat.totalDays}</p>
                            <p>Total Present: {stat.totalPresent}</p>
                            <p>Total Absent: {stat.totalDays - stat.totalPresent}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {error && <p>Error: {error}</p>}
            {attendanceMessage && <p>{attendanceMessage}</p>}
            <div className='grid grid-cols-2 my-3'>
                {studentData.map((student, index) => (
                    <ul className='my-3' key={index}>
                        <li>Name: {student.name}</li>
                        <li>Email: {student.email}</li>
                        {individualAttendanceStats[student.email] ? (
                            <>
                                <p>Total Days: {individualAttendanceStats[student.email].totalDays || 0}</p>
                                <p>Present Days: {individualAttendanceStats[student.email].presentDays || 0}</p>
                                <p>Absent Days: {individualAttendanceStats[student.email].absentDays || 0}</p>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                        {individualAttendanceStats[student.email]?.currentAttendancePresent ? (
                            <button onClick={() => markAttendance(student.email, false)}>Mark Absent</button>
                        ) : (
                            <button onClick={() => markAttendance(student.email, true)}>Mark Present</button>
                        )}
                    </ul>
                ))}
            </div>
        </div>
    );
}

export default Attendance;
