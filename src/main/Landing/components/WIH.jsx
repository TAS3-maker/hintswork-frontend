import React from 'react';
import phoneImg from '../assets/phoneImg.png';
import messageDoodle from '../assets/messageIcon.png'; 
import checkmarkIcon from '../assets/checkmark.png'; 
const WIH = () => {
  return (
    <div className="w-full px-4 md:px-16 py-10">
      <h1 className="text-4xl mt-20  md:text-5xl font-bold text-center mb-10">
        What is <span className="text-red-500">HintsWork?</span>
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-20">
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <div
            className="hidden sm:block absolute overflow-x-hidden  top-1/2 -translate-y-1/2 -z-10"
            style={{
              width: '340px',
              height: '340px',
              background: 'linear-gradient(135deg, #fff 0%, #fdf3c8ff 100%)',
              borderRadius: '50% 40% 60% 50% / 60% 50% 40% 50%',
            }}
          ></div>
          <img
            src={phoneImg}
            alt="HintsWork App Phone"
            className="w-[260px] md:w-[328px] h-[458px] drop-shadow-2xl md:mt-30 relative"

          />
        </div>
        <div className="flex-1 max-w-xl">
          <h2 className="text-2xl font-bold mb-2">Wellness Made Simple</h2>
          <p className="text-gray-600 text-base md:text-lg mb-4">
            Hints Work! is a behavior-change platform that helps you build better habits through small, actionable nudges we call Hints. Whether it’s improving focus, eating healthier, or managing stress, our Hints guide you step-by-step and reward consistency—no overwhelm.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-red-500 text-xl mr-2 "><img src={checkmarkIcon} /></span>
              <span><b>Simple Hints:</b> two to three words you can act on now.</span>
            </li>
            <img
            src={messageDoodle}
            alt="Message Doodle"
            className=" hidden sm:block  absolute w-24 md:ml-20 ml-60 pointer-events-none opacity-90"
            style={{ zIndex: -1 }}
          />
            <li className="flex items-start z-10">
              <span className="text-red-500 text-xl mr-2 "><img src={checkmarkIcon} /></span>
              <span><b>Backed by Research:</b> every Hint is validated (Science Says...)</span>
            </li>
            <li className="flex items-start z-10">
              <span className="text-red-500 text-xl mr-2"><img src={checkmarkIcon} /></span>
              <span><b>Gamified for Momentum:</b> points, streaks, trophies—progress you can feel.</span>
            </li>
            <li className="flex items-start z-10">
              <span className="text-red-500 text-xl mr-2"><img src={checkmarkIcon} /></span>
              <span><b>Human, Not Heavy:</b> no calorie obsession, no shaming—just smart</span>
            </li>
          </ul>
          <button className="bg-[#E2221F] mb-4 md:mt-6 text-white px-4 sm:px-6 ml-[0px] py-3 sm:py-4 rounded-lg text-xl sm:text-2xl  font-medium shadow-md">
            See Rewards
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default WIH;