import React from "react";
import ResTemp from "../components/ResourceTemp";
import ResData from "../components/ResourceData.json";
import Navbar from "../components/Navbar";

const Resources = () => {
  return (
    <div className=" overflow-hidden">
      <div className=" gradient-container bg-center h-full bricolage-font">
        <div className=" pt-5">
          <Navbar />
          <div className=" md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-hidden">
            {ResData.map((data, index) => (
              <ResTemp key={index} data={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
