import React,{useEffect} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import SigninUI from "./components/SigninUi.jsx";
import LoginUI from "./components/ui/LoginUI.jsx";
import Candidate from "./components/Candidate.jsx";
import RecruiterSignup from "./components/RecruiterSignup.jsx";
import RecruiterLogin from "./components/RecruiterLogin.jsx"; 
import CandidateLogin from "./components/CandidateLogin.jsx";
import Home from "./components/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CNavbar from "./components/CNavbar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Layout() {
  const location = useLocation();
  const user = localStorage.getItem("user_type");
  useEffect(() => {
    if(user && location.pathname === "/") {
      window.location.replace("/home");
    }
  },[user, location.pathname]);
  const publicNavbarHideRoutes = ["/login","/signup","/candidate","/recruiter","/candidate-login","/recruiter-login",];
  const loggedInNavbarRoutes = ["/home","/jobs","/internships","/settings","/applications","/profile"];
  const showPublicNavbar = publicNavbarHideRoutes.includes(location.pathname);
  const showLoggedInNavbar = loggedInNavbarRoutes.includes(location.pathname);
  return (
    <>
      {!showPublicNavbar && !showLoggedInNavbar && <Navbar />}
      {showLoggedInNavbar && <CNavbar />}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SigninUI />} />
        <Route path="/login" element={<LoginUI />} />
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/recruiter" element={<RecruiterSignup />} />
        <Route path="/candidate-login" element={<CandidateLogin />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/home"element={<ProtectedRoute><Home /></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

export default function App() {
  return(
    <>
      <Layout />
      <ToastContainer />
    </>

  )
}



