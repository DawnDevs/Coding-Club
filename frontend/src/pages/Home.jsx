import React from "react";
import Navbar from "../components/Navbar";
import HomePic from '../assets/home.png';
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className=" gradient-container bg-cover h-screen bricolage-font">
      <div className=" pt-5">
        <Navbar />
        <div className=" pt-24 flex space-x-20 mx-[18%] items-center">
            <div className=" flex justify-center w-full">
              <img className=" h-44 md:h-72 lg:h-96" src={HomePic} alt="" />
            </div>
            <div className=" items-center">
              <p className=" gradient-container1 w-fit shadow-xl text-4xl font-semibold rounded-md p-4">Anonymous!</p>
              <p className=" pt-6 text-xl">We're a dynamic tech club offering coding classes that dive deep into the latest and greatest in the world of technology!</p>
              <div className=" flex justify-center pt-10 text-base md:text-xl font-semibold space-x-10">
                <Link to="" className='hover:cursor-pointer border-2 border-gray-900 w-fit p-4 px-6 rounded-full transition-transform hover:scale-95 ease-in-out hover:shadow-2xl'> Resources 🡥</Link>
                <Link to='/mint' className='hover:cursor-pointer border-2 border-gray-900 w-fit p-4 px-6 text-black bg-green-400 rounded-full transition-transform hover:scale-95 ease-in-out hover:shadow-2xl'> Explore More 🡥  </Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
