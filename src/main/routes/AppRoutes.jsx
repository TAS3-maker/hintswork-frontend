import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Landinglayout from "../Landing/Landinglayout.jsx";
import DashboardLayout from "../pages/Dashboard/DashboardLayout.jsx";
import ForgetPass from "../pages/Login/ForgetPass.jsx";
import CheckEmail from "../pages/Login/CheckEmail.jsx";
import PasswordReset from "../pages/Login/PasswordReset.jsx";
import NewPassword from "../pages/Login/NewPassword.jsx";
import PasswordDone from "../pages/Login/PasswordDone.jsx";
import { AuthProvider } from "../contexts/AuthContext.jsx";
import PrivateRoute from "../routes/PrivateRoute.jsx";
import { UserProvider } from "../contexts/UserContext.jsx";
import { SponsorProvider } from "../contexts/SponsorContext.jsx";
// import jwtDecode from 'jwt-decode';

// import RoleBasedRoute from "./RoleBasedRoute";
export default function AppRoutes() {
  return (
    <AuthProvider>
      <UserProvider>
        <SponsorProvider>
   <BrowserRouter
  future={{ 
    v7_startTransition: true,
    v7_relativeSplatPath: true 
  }}
>
      <Routes>
    <Route path="/" element={<Landinglayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<DashboardLayout /> } />
   

        <Route path="/forgot-password" element={<ForgetPass />} />
       <Route path="/email-OTP" element={<CheckEmail />} />
       <Route path="/password-reset" element={<PasswordReset />} />
       <Route path="/new-password" element={<NewPassword />} />
      <Route path="/done" element={<PasswordDone />} />
        <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />

        {/* <Route
          path="/dashboard"
          element={
            <RoleBasedRoute
              element={<h1>General Dashboard</h1>}
              allowedRoles={["user", "admin", "superadmin"]}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <RoleBasedRoute
              element={<h1>Admin Panel</h1>}
              allowedRoles={["admin"]}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <RoleBasedRoute
              element={<h1>User Profile</h1>}
              allowedRoles={["user"]}
            />
          }
        />

        <Route
          path="/superadmin/dashboard"
          element={
            <RoleBasedRoute
              element={<h1>Super Admin Dashboard</h1>}
              allowedRoles={["superadmin"]}
            />
          }
        /> */}

    
        <Route path="/*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
    </SponsorProvider>
    </UserProvider>
    </AuthProvider>
  );
}
