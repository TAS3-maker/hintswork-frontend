import React from "react";
import trophy from "../assets/trophy.png";
import lightbulb from "../assets/lightbulb.png";
import doublePhone from "../assets/doublePhone.png";
import home from "../assets/Home.png";
import Header from "./Header";
const LandPage1 = () => {
  return (
    <div
      className="testing relative font-sans bg-[#fedc63] px-5 md:px-0 md:bg-transparent ">
     
    <div className=""> 
    <div className="flex flex-col-reverse md:flex-row items-start justify-between md:pl-[72px] bg-transparent ">
      <div className="w-full max-w-1/2 text-center  md:text-left md:pr-30 md:flex-col mb-12 pt-0 md:pt-16 ">
          <h1 className="text-4xl md:text-4xl font-bold text-red-600">
            Science Says...
          </h1>
          <div className="max-w-sm m-auto md:m-0">
            <p className="text-gray-700 text-Montserrat sm:text-xs md:text-xl md:z-10 mb-6 mt-6 md:mt-8 leading-relaxed text-wrap">
              Unlock your potential with science-backed micro-behaviors that transform your daily habits.
            </p>
          </div>
          <a
            href="#"
            className="bg-red-500 hover:bg-red-600 transition-colors text-white px-6 py-3 rounded-md text-base sm:text-lg font-semibold shadow-md inline-block"
          >
            Explore Hints
          </a>
        </div>
        <div className="double-phnimg right-0  w-full max-w-1/2 md:7 h-auto ">
        <div className="">

          <img
            src={doublePhone}
            alt="phone"
            className="w-[100%] h-[100%]"
          />
        </div>
      </div>
    </div>
    </div> 
      
    </div>
  );
};
export default LandPage1;