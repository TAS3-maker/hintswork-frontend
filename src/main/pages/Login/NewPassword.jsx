import React, { useState } from 'react';
import logo from "../../assets/logo2.png";
import trophy from "../../assets/trophy.png";
import messageIcon from "../../assets/messageIcon.png";
import rectangleLogin from "../../assets/rectangleLogin.png";
import rectangleLogin2 from "../../assets/rectangleLogin2.png";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // ✅ adjust path if needed

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetPassword, loading } = useAuth(); // ✅ from context
  const navigate = useNavigate();

  const handleClick = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const res = await resetPassword(newPassword);
    if (res) {
      navigate("/done");
    }
  };

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-hidden h-screen flex justify-center items-center bg-[#FFF9E5]">

      {/* LEFT DESIGN */}
      <div className="hidden lg:block left-0 top-0 h-full w-1/2">
        <div className="absolute transform rotate-130 origin-top-left top-0 mt-[-10px] left-80 w-full h-[120px] ">
          <img src={rectangleLogin} alt="" className="w-[80%] absolute top-4 object-cover object-top" />
          <img src={rectangleLogin2} alt="" className="w-[80%] absolute top-10 left-0 object-cover object-top" />
        </div>
        <div className='absolute left-25 bottom-50'>
          <img src={logo} className='w-[60%]' alt="Logo" />
        </div>
        <div className="absolute bottom-0 left-0 md:left-80 w-full h-[120px] overflow-hidden z-0">
          <img src={rectangleLogin} alt="" className="w-[80%] absolute top-4 object-cover object-top" />
          <img src={rectangleLogin2} alt="" className="w-[80%] absolute top-10 left-0 object-cover object-top" />
        </div>
      </div>

      {/* MOBILE LOGO */}
      <div className='block lg:hidden absolute top-4 left-1/2 transform -translate-x-1/2 z-20'>
        <img src={logo} className='w-32' alt="Logo" />
      </div>

      <img src={messageIcon} className='hidden lg:block w-[10%] absolute bottom-10 right-6' alt="Message" />
      <img src={trophy} alt="" className='hidden lg:block w-[12%] absolute z-20 ml-50' />

      {/* FORM */}
      <div className='w-full lg:w-[50%] absolute right-0 h-screen bg-white rounded-b-4xl rounded-t-4xl z-10 shadow-2xl'>
        <div className="w-[90%] max-w-[340px] mx-auto mt-20 px-6 py-8 rounded-md">
          <h2 className="text-2xl font-bold text-center mb-1">Set a new password</h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Create a new password. Ensure it differs from previous ones for security.
          </p>

          {/* New Password */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border-b border-gray-300 focus:outline-none py-2 placeholder-gray-400"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-b border-gray-300 focus:outline-none py-2 pr-10 placeholder-gray-400"
            />
            <div
              className="absolute right-0 top-1 cursor-pointer pr-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>

          <button
            className="w-full bg-yellow-400 text-white font-semibold py-2 rounded-md hover:bg-yellow-500 transition duration-300"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;




// import React, { useState } from 'react'
// import logo from "../../assets/logo2.png"
// import trophy from "../../assets/trophy.png"
// import messageIcon from "../../assets/messageIcon.png"
// import rectangleLogin from "../../assets/rectangleLogin.png"
// import rectangleLogin2 from "../../assets/rectangleLogin2.png"
// import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
// import { useNavigate } from 'react-router-dom'

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false)
//   const navigate = useNavigate()

//   const handleClick = () => {
//     navigate("/done")
//   }

//   return (
//     <div className="w-full relative overflow-x-hidden overflow-y-hidden h-screen flex justify-center items-center bg-[#FFF9E5]">

//       {/* LEFT PART WRAPPER - hidden on mobile & tablet, visible on desktop+ */}
//       <div className="hidden lg:block  left-0 top-0 h-full w-1/2">

//         {/* Top background rectangles */}
//         <div className="absolute transform rotate-130 origin-top-left top-0 mt-[-10px] left-80 w-full h-[120px] ">
//           <img
//             src={rectangleLogin}
//             alt=""
//             className="w-[80%] sm:w-[60%] md:w-[40%] absolute top-4 object-cover object-top"
//           />
//           <img
//             src={rectangleLogin2}
//             alt=""
//             className="w-[80%] sm:w-[60%] md:w-[40%] absolute top-10 left-0 object-cover object-top"
//           />
//         </div>

//         {/* Desktop Logo */}
//    <div className='absolute left-25 bottom-50'>
//             <img src={logo} className='w-[60%]' alt="Logo" />
//           </div>

     

//         {/* Bottom background rectangles */}
//         <div className="absolute bottom-0 left-0 md:left-80 w-full h-[120px] overflow-hidden z-0">
//           <img
//             src={rectangleLogin}
//             alt=""
//             className="w-[80%] sm:w-[60%] md:w-[40%] absolute top-4 object-cover object-top"
//           />
//           <img
//             src={rectangleLogin2}
//             alt=""
//             className="w-[80%] sm:w-[60%] md:w-[40%] absolute top-10 left-0 object-cover object-top"
//           />
//         </div>

//       </div>

//       {/* Mobile Logo */}
//       <div className='block lg:hidden absolute top-4 left-1/2 transform -translate-x-1/2 z-20'>
//         <img src={logo} className='w-32' alt="Logo" />
//       </div>

//       {/* Message Icon */}
//       <img src={messageIcon} className='hidden lg:block w-[10%] sm:w-[6%] md:w-[6%] z-20 absolute bottom-10 right-6' alt="Message" />
//          {/* Trophy */}
//         <img src={trophy} alt="" className='hidden lg:block md:mt-[55%] mb-[70%]  w-[12%] absolute sm:w-[8%] md:w-[10%]  z-20  ml-50' />

//       {/* Form section - full width on mobile/tablet, half width on desktop+ */}
//       <div className='w-full lg:w-[50%] absolute right-0 h-screen bg-white rounded-b-4xl shadow-2xl rounded-t-4xl z-10'>
//         <div className="w-[90%]  max-w-[340px] lg:max-w-[340px] md:max-w-[540px] mx-auto mt-20 lg:mt-30 md:mt-70 bg-white px-6 py-8 rounded-md">

//           <h2 className="text-2xl lg:text-2xl font-bold text-center mb-1 md:text-5xl lg:mb-2 md:mb-4">Set a new password</h2>

//           <p className="text-gray-500 text-sm text-center mb-6 lg:text-sm md:text-xl lg:mb-5 md:mb-18">
//             Create a new password. Ensure it differs from previous ones for security
//           </p>

//           <div className="mb-4 relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               placeholder="Enter your new password"
//               className="w-full border-b border-gray-300 focus:outline-none py-2 placeholder-gray-400"
//             />
//           </div>

//           <div className="mb-6 relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               placeholder="Re-enter password"
//               className="w-full border-b border-gray-300 focus:outline-none py-2 pr-10 placeholder-gray-400"
//             />
//             <div
//               className="absolute right-0 top-1 cursor-pointer pr-2"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <EyeIcon className="h-5 w-5 text-gray-500" />
//               ) : (
//                 <EyeSlashIcon className="h-5 w-5 text-gray-500" />
//               )}
//             </div>
//           </div>

//           <button
//             className="w-full bg-yellow-400 lg:w-full lg:font-semibold lg:text-lg lg:h-[40px] md:h-[50px] md:w-full md:text-2xl md:font-bold text-white font-semibold py-1 rounded-md mb-1 hover:bg-yellow-500 transition duration-300"
//             onClick={handleClick}
//           >
//             Update Password
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login
