import React from 'react';
import ResTemp from '../components/ResourceTemp'
import ResData from '../components/ResourceData.json'
import Navbar from '../components/Navbar';


const Resources = () => {
  return (
    <div className="App">
       <div className=" gradient-container bg-cover h-screen bricolage-font">
      <div className=" pt-5">
        <Navbar />
      {/* Map over the cardData array and render a CardTemplate component for each object */}
      <div className=' md:grid md:grid-cols-2 lg:grid-cols-3'>
        {ResData.map((data, index) => (
          <ResTemp key={index} data={data} />
        ))}
      </div>
      </div></div>
    </div>
  );
};

export default Resources;
