import React from 'react'
import HowItWorks from '../assets/howitworks.png'
import { Element } from 'react-scroll'
import hiw1 from "../assets/hiw1.svg";
import hiw2 from "../assets/hiw2.svg";
import hiw3 from "../assets/hiw3.svg";
import hiw4 from "../assets/hiw4.svg";
import hiwv1 from "../assets/hiwv1.svg";
import hiwv2 from "../assets/hiwv2.svg";
const HIW = () => {
  return (
    <>
    <Element name='HIW'>
    <div className='flex flex-col items-center gap-8 px-5 md:px-16'>
      <div className='flex items-center flex-row flex-nowrap gap-2 justify-center'>
        <span className='text-[36px] leading-normal md:text-[64px] text-black font-bold'>How</span>
        <span className='text-[36px] leading-normal md:text-[64px] text-[#E2221F] font-bold'>It Works</span>
      </div>
      <div className='icon-block flex flex-col md:flex-row justify-center gap-10 md:gap-0'>
         <div className='flex flex-col items-center'>
          <div className='w-[97px] h-[97px]'>
             <img src={hiw1} alt='hiw1' className='w-full h-full'/>
           </div>
           <p className='text-[20px] text-black font-semibold text-center'>Receive a Hint</p>
           <p className='text-[#666666] text-[18px] font-normal text-center w-full max-w-[190px]'>Simple, science-backed nudge.</p>
         </div>

         <div className='hidden md:block'>
             <img src={hiwv1} alt='hiw1' className='w-full h-full'/>
           </div>

         <div className='flex flex-col items-center'>
          <div className='w-[97px] h-[97px]'>
             <img src={hiw2} alt='hiw1' className='w-full h-full'/>
           </div>
           <p className='text-[20px] text-black font-semibold text-center'>Take Action</p>
           <p className='text-[#666666] text-[18px] font-normal text-center w-full max-w-[190px]'>Apply it in your daily routine.</p>
         </div>

          <div className='hidden md:block'>
             <img src={hiwv2} alt='hiw1' className='w-full h-full'/>
           </div>

         <div className='flex flex-col items-center'>
          <div className='w-[97px] h-[97px]'>
             <img src={hiw3} alt='hiw1' className='w-full h-full'/>
           </div>
           <p className='text-[20px] text-black font-semibold text-center'>Earn Points</p>
           <p className='text-[#666666] text-[18px] font-normal text-center w-full max-w-[190px]'>Get rewarded for consistency.</p>
         </div>

          <div className='hidden md:block'>
             <img src={hiwv1} alt='hiw1' className='w-full h-full'/>
           </div>

         <div className='flex flex-col items-center'>
          <div className='w-[97px] h-[97px]'>
             <img src={hiw4} alt='hiw1' className='w-full h-full'/>
           </div>
           <p className='text-[20px] text-black font-semibold text-center'>Track Progress</p>
           <p className='text-[#666666] text-[18px] font-normal text-center w-full max-w-[190px]'>Watch your streaks grow.</p>
         </div>

      </div>
       <button className="bg-[#E2221F] mb-4 md:mt-6 text-white px-4 sm:px-6 ml-[0px] py-3 sm:py-4 rounded-lg text-xl sm:text-2xl  font-medium shadow-md">
            Try a Sample Hint
      </button>
    </div>
    </Element>
    </>
  )
}

export default HIW