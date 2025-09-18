import React, { useState } from 'react'
import logo from "../../assets/logo2.png"
import trophy from "../../assets/trophy.png"
import messageIcon from "../../assets/messageIcon.png"
import rectangleLogin from "../../assets/rectangleLogin.png"
import rectangleLogin2 from "../../assets/rectangleLogin2.png"
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'  // :white_check_mark: useAuth hook from context
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");       // :white_check_mark: email state
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(email, password);
    if (data) {
      navigate('/dashboard');
    }
  };
  return (
    <div className="w-full relative overflow-x-hidden overflow-y-hidden h-screen flex justify-center items-center bg-white md:bg-white lg:bg-[#FFF9E5]">
      <div className="hidden lg:block  left-0 top-0 h-full w-1/2">
        <div className="hidden md:block absolute transform rotate-[130deg] origin-top-left top-0 mt-[-10px] left-80 w-full h-[120px] ">
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
        <div className='absolute left-25 bottom-50'>
          <img src={logo} className='w-[60%]' alt="Logo" />
        </div>
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
      <div className='block md:block lg:hidden absolute top-4 left-1/2 transform -translate-x-1/2 z-20'>
        <img src={logo} className='w-32' alt="Logo" />
      </div>
      <img src={messageIcon} className='hidden lg:block   w-[10%] sm:w-[6%] md:w-[6%] z-20 absolute bottom-10 right-6' alt="Message" />
      <img src={trophy} alt="" className='hidden lg:block w-[10%] sm:w-[8%]  md:w-[10%] md:mt-[35%] absolute z-20 mb-[50%] ml-40' />
      <div className='w-full md:w-full lg:w-[50%] absolute right-0 md:h-full h-screen bg-white rounded-b-4xl shadow-2xl rounded-t-4xl z-10'>
        <form
          onSubmit={handleSubmit}
          className="w-[90%] lg:w-[100%] md:w-[100%] max-w-[340px] lg:max-w-[450px] md:max-w-[600px] mx-auto mt-20 lg:mt-40 md:mt-70 z-10 bg-white px-6 py-8 rounded-md"
        >
          <h2 className="text-2xl lg:text-2xl md:text-6xl font-bold text-center mb-1">Welcome Back</h2>
          <p className="text-gray-500 text-sm lg:text-sm md:text-3xl md:mt-4 md:mb-20 lg:mb-5 text-center mb-6">
            Enter your Email and Password to login
          </p>
          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              id="username"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 focus:outline-none py-2 placeholder-gray-400"
              required
            />
          </div>
          {/* Password */}
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 focus:outline-none py-2 pr-10 placeholder-gray-400"
              required
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
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full lg:text-lg lg:font-semibold lg:h-[40px] bg-yellow-400 text-white md:text-2xl md:font-bold md:h-[50px] font-semibold py-1 rounded-md mb-1 hover:bg-yellow-500 transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <Link to="/forgot-password" className="text-sm lg:text-sm text-gray-900 italic block text-right md:text-lg">
            Forgot password ?
          </Link>
        </form>
      </div>
    </div>
  )
}
export default Login