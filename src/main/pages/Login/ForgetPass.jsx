import React, { useState } from 'react'
import logo from "../../assets/logo2.png"
import trophy from "../../assets/trophy.png"
import messageIcon from "../../assets/messageIcon.png" 
import rectangleLogin from "../../assets/rectangleLogin.png"
import rectangleLogin2 from "../../assets/rectangleLogin2.png"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState(null);
  const { forgotPassword, loading, error: authError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLocalError(null);  // clear previous local errors
    if (!email) {
      setLocalError("Please enter your email.");
      return;
    }

    const response = await forgotPassword(email);
    if (response) {
      navigate("/email-OTP");
    }
  }

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-hidden h-screen flex justify-center items-center bg-white md:bg-white lg:bg-[#FFF9E5]">
      {/* ...same UI code as before... */}

      <div className='w-full md:w-full lg:w-[50%] absolute right-0 h-screen bg-white rounded-b-4xl shadow-2xl rounded-t-4xl z-10'>
        <div className="w-[90%] lg:w-[340px] lg:mt-40 lg:max-w-[340px] max-w-[340px] md:w-[100%] md:max-w-[440px] md:mt-[40%] mx-auto mt-20 z-10 bg-white px-6 py-8 rounded-md">
          <h2 className="text-3xl font-bold lg:mb-5 md:mb-3 lg:text-3xl md:text-5xl text-center mb-3">Forgot password</h2>

          <p className="text-gray-500 md:text-xl lg:text-sm text-sm text-center mb-6">
            Please enter your email to reset your password
          </p>

          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Enter Your email"
              className="w-full border-b border-gray-300 focus:outline-none py-2 placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          {/* Display local error first, then auth context error */}
          {(localError || authError) && (
            <p className="text-red-500 mb-4 text-center">{localError || authError}</p>
          )}

          <button
            className={`w-full lg:font-semibold lg:h-[40px] lg:text-lg bg-yellow-400 md:h-[50px] md:text-xl md:font-bold text-white font-semibold py-1 rounded-md hover:bg-yellow-500 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForgetPass;
