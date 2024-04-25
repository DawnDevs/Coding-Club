import React, { useState, useEffect } from "react";
import ResTemp from "../components/ResourceTemp";
import Navbar from "../components/Navbar";

const Resources = () => {
  const [resourceData, setResourceData] = useState([]);

  useEffect(() => {
    // Fetch resource data from your backend API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/resources");
        if (!response.ok) {
          throw new Error("Failed to fetch resource data");
        }
        const data = await response.json();
        setResourceData(data);
      } catch (error) {
        console.error("Error fetching resource data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="overflow-hidden">
      <div className="gradient-container bg-center h-full bricolage-font">
        <div className="pt-5">
          <Navbar />
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-hidden">
            {resourceData.map((data, index) => (
              <ResTemp key={index} data={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
