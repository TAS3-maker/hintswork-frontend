import { createContext, useContext,useState, useEffect } from "react";
import axios from 'axios';
import API_BASE_URL from "../config/apiConfig";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // LOGIN FUNCTION
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("responsee",res);
      setUser(res.data.user);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setLoading(false);
      return null;
    }
  };
  const logout = () => {
    setUser("");
  };



  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/forgot-pass`,
        { email }
      );
      // Save email for next steps (OTP verify & reset  password)
      localStorage.setItem("forgotEmail", email);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setLoading(false);
      return null;
    }
  };






//   const forgotPassword = async (email, newPassword) => {
//   setLoading(true);
//   setError(null);
//   try {
//     const res = await axios.post(
//       `${API_BASE_URL}/api/auth/forgot-password`, // ✅ your route
//       { email, newPassword }
//     );
//     setLoading(false);
//     return res.data; // return success response
//   } catch (err) {
//     setError(err.response?.data?.message || "Something went wrong");
//     setLoading(false);
//     return null;
//   }
// };


const verifyOtp = async (otp) => {
  setLoading(true);
  setError(null);
  try {
    const email = localStorage.getItem("forgotEmail");
    const res = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
      email,
      otp,
    });
    console.log(email);
    setLoading(false);
    return res.data;
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
    setLoading(false);
    return null;
  }
};


const resetPassword = async (newPassword) => {
  setLoading(true);
  setError(null);
  try {
    const email = localStorage.getItem("forgotEmail");
    const res = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
      email,
      newPassword,
    });
    setLoading(false);
    return res.data;
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
    setLoading(false);
    return null;
  }
};





  return (
    <AuthContext.Provider value={{ user, login, logout, forgotPassword, verifyOtp, resetPassword , loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};


// import { createContext, useState, useEffect } from "react";
// import {jwtDecode} from "jwt-decode";   
// import { logoutService } from "../services/authService";



// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         if (decoded.exp * 1000 > Date.now()) {
//           setUser({ token, role: decoded.role });
//         } else {
//           logoutService();
//           setUser(null);
//         }
//       } catch {
//         logoutService();
//         setUser(null);
//       }
//     }
//   }, []);

//   const login = (data) => {
//     localStorage.setItem("token", data.token); // ✅ store token here only
//     setUser({ token: data.token, role: data.role });
//   };

//   const logout = () => {
//     logoutService();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
