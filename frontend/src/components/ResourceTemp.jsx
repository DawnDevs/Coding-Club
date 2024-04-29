import React, { useState, useEffect } from "react";

const CardTemplate = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/resources");
        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center py-4">
      {resources.map((resource) => (
        <div
          key={resource._id}
          className="card bg-cyan-100 mt-6 rounded-lg transition-transform ease-in-out hover:scale-105 shadow-2xl w-[90%] md:w-[80%] lg:w-[70%] "
        >
          <div className="p-6">
            <div className="flex justify-center">
              <iframe src={resource.videoUrl} frameBorder="0"></iframe>
            </div>
            <div className="card-body">
              <p className="card-title font-semibold text-xl pt-2 flex justify-center">
                {resource.title}
              </p>
              <p className="card-text flex justify-center">
                {resource.description}
              </p>
              <div className="flex justify-center pt-2">
                <a
                  href={resource.videoUrl}
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

export default CardTemplate;
