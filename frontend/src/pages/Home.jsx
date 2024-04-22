import React from "react";
import Navbar from "../components/Navbar";
import HomePic from '../assets/home.png';
import { Link } from "react-router-dom";
import Whatsapp from '../assets/whatsapp4.png'


const Home = () => {
  return (
    <div className=" gradient-container bg-cover h-screen bricolage-font">
      <div className=" pt-5">
        <Navbar />
        <div className=" pt-12 md:pt-24 md:flex space-x-2 lg:space-x-20 mx-2 lg:mx-[18%] items-center">
            <div className=" flex justify-center w-full">
              <img className=" h-56 md:h-72 lg:h-96" src={HomePic} alt="" />
            </div>
            <div className=" pt-6 md:pt-0 items-center">
              <div className=" gradient-container1 rounded-lg shadow-xl">
                <p className=" text-2xl md:text-4xl font-semibold flex justify-center p-4"> ⪻Anonymous /⪼</p>
              </div>
              <p className=" pt-6 text-center text-xl">We're a dynamic tech club offering coding classes that dive deep into the latest and greatest in the world of technology!</p>
              <div className=" flex justify-center pt-10 text-base md:text-xl font-semibold space-x-10">
                <Link to="/resources" className='hover:cursor-pointer border-2 border-gray-900 w-fit p-3 px-6 transition-transform hover:scale-95 ease-in-out hover:shadow-2xl'> Resources 🡥</Link>
                <Link to='/mint' className='hover:cursor-pointer border-2 border-gray-900 w-fit p-3 px-6 text-black transition-transform hover:scale-95 ease-in-out hover:shadow-2xl'> Explore More 🡥  </Link>
              </div>
            </div>
        </div>
        <div className="absolute pb-10 bottom-0 hover:cursor-pointer animate-pulse right-0">
          <a className=" hover:pl-6" href=" https://chat.whatsapp.com/HSxFI66MnrJ6K6GGkDppV8" target="_blank"><img className="h-12 md:h-16 bg-green-500 hover:bg-green-600 hover:pr-6 p-2 rounded-l-2xl" src={Whatsapp} alt="" /></a>
        </div>
      </div>
    </div>
  );
};

export default Home;
