import React, { useState } from "react";
import logo from "../../assets/logo2.png";
import trophy from "../../assets/trophy.png";
import messageIcon from "../../assets/messageIcon.png";
import rectangleLogin from "../../assets/rectangleLogin.png";
import rectangleLogin2 from "../../assets/rectangleLogin2.png";
import tick from "../../assets/tick.png";
import { useNavigate } from "react-router-dom";

const ForgetPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/login"); // update path if your login route is different
  };

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-hidden h-screen flex justify-center items-center bg-[#FFF9E5]">

      {/* LEFT PART (hidden below lg) */}
      <div className="hidden lg:block  left-0 top-0 h-full w-1/2">

        {/* Top Rectangles */}
        <div className="absolute transform rotate-130 origin-top-left top-0 mt-[-10px] left-80 w-full h-[120px] ">
          <img
            src={rectangleLogin}
            alt=""
            className="w-[80%] sm:w-[60%] md:w-[40%] absolute top-4 object-cover object-top"
          />
          <img
            src={rectangleLogin2}
            alt=""
            className="w-[80%] sm:w-[60%] md:w-[40%] absolute top-10 left-0 object-cover object-top"
          />
        </div>

        {/* Desktop Logo */}
     <div className='absolute left-25 bottom-50'>
              <img src={logo} className='w-[60%]' alt="Logo" />
            </div>

   

        {/* Bottom Rectangles */}
        <div className="absolute bottom-0 left-0 md:left-80 w-full h-[120px] overflow-hidden z-0">
          <img
            src={rectangleLogin}
            alt=""
            className="w-[80%] sm:w-[60%] md:w-[40%] absolute top-4 object-cover object-top"
          />
          <img
            src={rectangleLogin2}
            alt=""
            className="w-[80%] sm:w-[60%] md:w-[40%] absolute top-10 left-0 object-cover object-top"
          />
        </div>
      </div>

      {/* MOBILE Logo */}
      <div className="block lg:hidden absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <img src={logo} className="w-28" alt="Logo" />
      </div>

      {/* Message Icon (always visible) */}
      <img
        src={messageIcon}
        className="hidden lg:block w-[10%] sm:w-[6%] md:w-[6%] z-20 absolute bottom-10 right-6"
        alt="Message Icon"
      />
           {/* Trophy */}
        <img src={trophy} alt=""  className="hidden lg:block w-[12%] sm:w-[8%] absolute md:w-[10%] z-20 mb-90 ml-50" />

      {/* RIGHT PART FORM - full width on mobile/tablet, half on desktop+ */}
      <div className="w-full lg:w-1/2  absolute right-0 h-screen bg-white rounded-b-4xl shadow-2xl rounded-t-4xl flex flex-col items-center justify-center text-center px-4 sm:px-0">
        <div className="w-[100px] md:w-[100px] lg:w-[100px]  sm:w-[120px] lg:mt-0  md:mt-0 mt-10 z-10">
          <img src={tick} alt="Success" className="w-full object-contain" />
        </div>

        {/* Success Message */}
        <div className="mt-6 ">
          <h2 className="text-xl lg:text-2xl md:text-4xl font-semibold text-gray-700 mb-2">Password Updated!</h2>
          <p className="text-gray-500 text-sm lg:text-base md:text-3xl">
            Your password has been successfully updated.
          </p>
        </div>

        {/* Back to Login Button */}
        <button
          className="mt-6 md:w-[300px] lg:h-[45px] lg:text-xl lg:font-semibold md:text-2xl md:font-bold md:h-[60px] bg-yellow-400 text-white font-semibold py-2 px-6 rounded-md hover:bg-yellow-500 transition duration-300"
          onClick={handleBackToLogin}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgetPass;
