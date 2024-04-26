import React, { useState, useEffect } from "react";

const UpdateTemp = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/newupdates");
        if (!response.ok) {
          throw new Error("Failed to fetch updates");
        }
        const data = await response.json();
        setUpdates(data);
      } catch (error) {
        console.error("Error fetching updates:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center py-4">
      {updates.map((update) => (
        <div
          key={update._id}
          className="card mt-6 rounded-lg transition-transform ease-in-out hover:scale-105 hover:shadow-xl border-2 border-black w-[90%] md:w-[80%] lg:w-[70%] "
        >
          <div className="p-6">
            <div className="flex justify-center">
              {/* <iframe src={update.videoUrl} frameBorder="0"></iframe> */}
              <img src={update.imageUrl} height={100} width={100} className="" alt="update" />
            </div>
            <div className="card-body">
              <p className="card-title font-semibold text-xl pt-2 flex justify-center">
                {update.title}
              </p>
              <p className="card-text flex justify-center">
                {update.description}
              </p>
              <div className="flex justify-center pt-2">
                <a
                  href={update.link}
                  target="_blank"
                  className="card-text hover:cursor-pointer flex justify-center border-2 border-gray-900 bg-gradient-to-tr from-cyan-400 via-cyan-200 to-cyan-100 hover:from-cyan-100 hover:via-cyan-200 hover:to-cyan-400 w-fit rounded-lg p-2 px-3 text-lg"
                >
                  Download 🡥
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateTemp;
