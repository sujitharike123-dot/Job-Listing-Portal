import React from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import SigninUi from "./components/SigninUi.jsx";
import LoginUI from "./components/LoginUI.jsx";
import Recruiter from "./components/Recruiter.jsx";
import Candidate from "./components/Candidate.jsx";
function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup","/candidate", "/recruiter"]; 
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SigninUi />} />
        <Route path="/login" element={<LoginUI />} />
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/recruiter" element={<Recruiter />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
}
